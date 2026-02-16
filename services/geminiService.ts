import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";
import { MOCK_ANALYSIS_RESULT } from "../constants";

export const analyzeBlueprint = async (base64Image: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("⚠️ PLANSENSE: No API Key found.");
    console.warn("If you are running locally, create a .env file with API_KEY=your_key");
    console.warn("If you are on Netlify/Vercel, add API_KEY to your Environment Variables.");
    console.warn("Falling back to mock data for demonstration.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYSIS_RESULT), 2000));
  }

  const ai = new GoogleGenAI({ apiKey });

  // Clean base64 string if it contains metadata header
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG or JPEG, API is flexible with this field usually
              data: cleanBase64
            }
          },
          {
            text: `You are an expert architectural estimator. Analyze this floor plan image.

            **Goal**: Create a complete "tile map" of the floor plan. **EVERY walkable inch** of the interior AND attached exterior living space must be categorized into a room or zone.

            **Detection Rules**:
            1. **No Gaps (Tile Map Logic)**: Imagine you are flooding the floor plan with colored water. Every area must be claimed.
               - If a space connects rooms, it **MUST** be identified as "Hallway", "Foyer", "Landing", "Stairwell", or "Circulation".
               - Bounding boxes of adjacent spaces should share edges (touch) to minimize whitespace gaps.
            2. **All Functional Areas**:
               - Detect **Living Spaces**: Living, Dining, Kitchen, Bed, Bath, Office.
               - Detect **Service Areas**: Laundry, Pantry, WIC (Walk-in Closet), Powder Room, Storage, Utility.
               - Detect **Outdoor**: Balcony, Patio, Deck, Veranda, Porch.
            3. **IGNORE Noise**: 
               - **Measurement Lines**: Do not detect thin rectangles that look like dimension lines, leaders, or wall thicknesses as rooms.
               - **Exterior**: Ignore grass, driveways, or labels outside the building envelope.
            4. **Coordinates**: 
               - [0,0] is top-left, [1000,1000] is bottom-right.
               - Ensure coordinates define a box that covers the floor area of the room.

            **Output Format**:
            Return the result as a raw JSON object with this exact structure:
            {
              "totalArea": number,
              "roomCount": number,
              "propertyType": string,
              "rooms": [
                {
                  "id": string,
                  "name": string,
                  "type": "bedroom" | "kitchen" | "bathroom" | "living" | "hallway" | "office" | "garage" | "balcony" | "other",
                  "areaSqFt": number,
                  "boundingBox": [ymin, xmin, ymax, xmax],
                  "suggestedFlooring": string
                }
              ]
            }
            
            IMPORTANT: Return ONLY valid JSON. Do not include markdown code blocks.`
          }
        ]
      },
      config: {
        temperature: 0.1 // Low temperature for precision
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean potential markdown code blocks if the model includes them despite instructions
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(jsonString) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback to mock data in case of error to keep app usable in demo
    return MOCK_ANALYSIS_RESULT;
  }
};