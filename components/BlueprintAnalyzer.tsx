import React, { useState, useRef, useEffect } from 'react';
import { Upload, ZoomIn, ZoomOut, AlertCircle, Loader2, MousePointer2, ScanLine } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AnalysisResult, Room } from '../types';
import { analyzeBlueprint } from '../services/geminiService';
import { Button, Card, Badge } from './UI';

interface BlueprintAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  existingResult: AnalysisResult | null;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#f97316'];

export const BlueprintAnalyzer: React.FC<BlueprintAnalyzerProps> = ({ onAnalysisComplete, existingResult }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(existingResult);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingResult) {
      setResult(existingResult);
    }
  }, [existingResult]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        runAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateIoU = (boxA: [number, number, number, number], boxB: [number, number, number, number]) => {
    const [yA1, xA1, yA2, xA2] = boxA;
    const [yB1, xB1, yB2, xB2] = boxB;

    const xInter1 = Math.max(xA1, xB1);
    const yInter1 = Math.max(yA1, yB1);
    const xInter2 = Math.min(xA2, xB2);
    const yInter2 = Math.min(yA2, yB2);

    if (xInter2 < xInter1 || yInter2 < yInter1) return 0.0;

    const interArea = (xInter2 - xInter1) * (yInter2 - yInter1);
    const boxAArea = (xA2 - xA1) * (yA2 - yA1);
    const boxBArea = (xB2 - xB1) * (yB2 - yB1);

    return interArea / (boxAArea + boxBArea - interArea);
  };

  const validateAnalysisResult = (data: AnalysisResult): AnalysisResult => {
    if (!data || !data.rooms) return data;
    
    // 1. Clamp coordinates to 0-1000 range
    let processedRooms = data.rooms.map(room => {
       const [ymin, xmin, ymax, xmax] = room.boundingBox;
       return {
         ...room,
         boundingBox: [
           Math.max(0, Math.min(1000, ymin)),
           Math.max(0, Math.min(1000, xmin)),
           Math.max(0, Math.min(1000, ymax)),
           Math.max(0, Math.min(1000, xmax))
         ] as [number, number, number, number]
       };
    });

    // 2. Filter out artifacts (too small or extreme aspect ratios usually imply lines/walls)
    processedRooms = processedRooms.filter(room => {
       const [ymin, xmin, ymax, xmax] = room.boundingBox;
       const width = xmax - xmin;
       const height = ymax - ymin;
       
       // Filter extremely small noise (less than 1% of canvas width/height)
       if (width < 10 || height < 10) return false;

       // Filter lines (extreme aspect ratio) unless it's a hallway or balcony which can be long
       const aspectRatio = width / height;
       const isLongThin = aspectRatio > 15 || aspectRatio < 1/15; 
       if (isLongThin && !['hallway', 'balcony'].includes(room.type)) {
         return false;
       }

       return true;
    });

    // 3. Deduplicate overlapping rooms
    const uniqueRooms: Room[] = [];
    
    for (const room of processedRooms) {
      const isDuplicate = uniqueRooms.some(existing => {
        // If IoU is high, it's likely a double detection of the same space
        return calculateIoU(room.boundingBox, existing.boundingBox) > 0.6;
      });
      
      if (!isDuplicate) {
        uniqueRooms.push(room);
      }
    }

    return {
       ...data,
       rooms: uniqueRooms,
       roomCount: uniqueRooms.length
    };
  };

  const runAnalysis = async (base64: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const rawData = await analyzeBlueprint(base64);
      const cleanData = validateAnalysisResult(rawData);
      
      if (cleanData.rooms.length === 0) {
         console.warn("AI returned 0 valid rooms.");
      }

      setResult(cleanData);
      onAnalysisComplete(cleanData);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // SVG Helper with clamping
  const getRectProps = (box: [number, number, number, number]) => {
    const ymin = Math.max(0, Math.min(1000, box[0]));
    const xmin = Math.max(0, Math.min(1000, box[1]));
    const ymax = Math.max(0, Math.min(1000, box[2]));
    const xmax = Math.max(0, Math.min(1000, box[3]));

    return {
      top: `${ymin / 10}%`,
      left: `${xmin / 10}%`,
      width: `${(xmax - xmin) / 10}%`,
      height: `${(ymax - ymin) / 10}%`,
    };
  };

  const pieData = result?.rooms.map(r => ({ name: r.type, value: r.areaSqFt }));

  const activeRoomId = hoveredRoomId || selectedRoomId;

  return (
    <div className="flex h-full gap-6">
      {/* Main Canvas Area */}
      <Card className="flex-1 flex flex-col relative overflow-hidden bg-[#F4F4F5] border-slate-200" 
            onClick={() => setSelectedRoomId(null)} /* Click background to deselect */
      >
        {/* Floating Toolbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white p-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-slate-100" onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" className="rounded-full px-4 h-9 shadow-none border-0 hover:bg-slate-100" onClick={() => fileInputRef.current?.click()}>
            <Upload size={14} /> <span className="text-xs">Upload</span>
          </Button>
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"><ZoomOut size={16} /></button>
          <span className="text-xs font-mono w-12 text-center text-slate-600">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"><ZoomIn size={16} /></button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
        </div>

        {/* Canvas Container */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-12 bg-[#F4F4F5] relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />

          {image ? (
            <div 
              className="relative transition-transform duration-300 ease-out origin-center shadow-xl bg-white ring-1 ring-slate-900/5 inline-flex select-none"
              style={{ transform: `scale(${zoom})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={image} 
                alt="Blueprint" 
                className="block pointer-events-none"
                style={{ maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }} 
              />
              
              {/* Overlays Layer */}
              {result && !isAnalyzing && (
                <div className="absolute inset-0 z-10">
                  {result.rooms.map((room) => {
                    const style = getRectProps(room.boundingBox);
                    const isActive = activeRoomId === room.id;
                    const isSelected = selectedRoomId === room.id;
                    const isHovered = hoveredRoomId === room.id;
                    
                    return (
                      <div
                        key={room.id}
                        className={`
                            absolute transition-all duration-200 cursor-pointer
                            ${isSelected ? 'z-40 border-2 border-slate-900 bg-slate-900/10 shadow-sm' : ''}
                            ${!isSelected && isHovered ? 'z-30 border border-slate-900/50 bg-slate-900/5' : ''}
                            ${!isSelected && !isHovered ? 'z-20 border border-transparent hover:border-slate-300' : ''}
                        `}
                        style={{ ...style }}
                        onMouseEnter={() => setHoveredRoomId(room.id)}
                        onMouseLeave={() => setHoveredRoomId(null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoomId(room.id === selectedRoomId ? null : room.id);
                        }}
                      >
                         {/* Room Label Tooltip */}
                         <div className={`
                            absolute left-1/2 -translate-x-1/2 
                            bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-full shadow-lg 
                            pointer-events-none whitespace-nowrap z-50 transition-all duration-200 font-medium
                            ${isActive ? '-top-10 opacity-100 scale-100' : '-top-8 opacity-0 scale-95'}
                         `}>
                            {room.name} <span className="opacity-50 mx-1">|</span> {room.areaSqFt} sqft
                         </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Loading Overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-in fade-in zoom-in duration-300 border border-slate-100">
                        <Loader2 className="animate-spin text-slate-900 mb-3" size={32} />
                        <span className="text-sm font-semibold text-slate-700">Analyzing Structures...</span>
                        <span className="text-xs text-slate-400 mt-1">Detecting rooms, walls, and dimensions</span>
                    </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-12 max-w-sm">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6">
                    <ScanLine size={32} className="text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">No blueprint uploaded</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Upload a floor plan image (PNG, JPG) to start the AI analysis and generate automated takeoffs.
                </p>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                    Select File
                </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Sidebar Info */}
      <div className="w-80 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col overflow-hidden border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MousePointer2 size={14} className="text-slate-400" />
                    <h3 className="font-semibold text-sm text-slate-700">Detected Rooms</h3>
                </div>
                {result && <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">{result.roomCount}</span>}
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {result ? (
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] uppercase tracking-wider text-slate-400 bg-white border-b border-slate-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 font-semibold pl-6">Room Name</th>
                                <th className="px-4 py-3 font-semibold text-right pr-6">Area</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {result.rooms.map((room) => {
                                const isActive = activeRoomId === room.id;
                                const isSelected = selectedRoomId === room.id;
                                return (
                                    <tr 
                                        key={room.id} 
                                        className={`
                                            cursor-pointer transition-colors
                                            ${isSelected ? 'bg-slate-50' : isActive ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}
                                        `}
                                        onMouseEnter={() => setHoveredRoomId(room.id)}
                                        onMouseLeave={() => setHoveredRoomId(null)}
                                        onClick={() => setSelectedRoomId(room.id === selectedRoomId ? null : room.id)}
                                    >
                                        <td className="px-4 py-3 pl-6">
                                            <div className={`font-medium ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{room.name}</div>
                                            <div className="text-[10px] text-slate-400 capitalize">{room.suggestedFlooring}</div>
                                        </td>
                                        <td className="px-4 py-3 pr-6 text-right font-mono text-xs text-slate-500">
                                            {room.areaSqFt} <span className="text-[10px] text-slate-300">ft²</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                        Upload a blueprint to see room data.
                    </div>
                )}
            </div>
        </Card>

        {/* Mini Stats */}
        <Card className="h-64 p-5 flex flex-col border-slate-200">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Space Distribution</h4>
            {result && pieData ? (
                 <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     cx="50%"
                     cy="50%"
                     innerRadius={50}
                     outerRadius={70}
                     paddingAngle={4}
                     dataKey="value"
                     stroke="none"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', fontSize: '12px' }}
                     itemStyle={{ fontSize: '12px', color: '#1e293b' }}
                   />
                   <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} iconSize={8} iconType="circle" />
                 </PieChart>
               </ResponsiveContainer>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-300">
                    <PieChart size={24} className="opacity-20" />
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};