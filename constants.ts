import { Project, Room } from "./types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p-101",
    title: "Downtown Office Renovation - Level 2",
    location: "Seattle, WA",
    budget: "$45,000 - $60,000",
    status: "Open",
    postedAt: "2 hrs ago",
    scope: ["Demolition of existing partitions", "New commercial carpet", "Electrical refit", "Glass partitioning"],
    bids: 4,
  },
  {
    id: "p-102",
    title: "Luxury Condo Kitchen Remodel",
    location: "Austin, TX",
    budget: "$25,000 - $35,000",
    status: "Bidding",
    postedAt: "1 day ago",
    scope: ["Custom cabinetry install", "Quartz countertop", "High-end appliance fitting", "Backsplash tiling"],
    bids: 12,
  },
  {
    id: "p-103",
    title: "Suburban Home Extension (Shell Only)",
    location: "Denver, CO",
    budget: "$80,000 - $100,000",
    status: "Closed",
    postedAt: "5 days ago",
    scope: ["Foundation pouring", "Framing", "Roofing", "Exterior siding"],
    bids: 8,
  }
];

export const COST_CATALOG = {
  Flooring: [
    { name: "Install Hardwood (Oak)", price: 12.50, unit: "sqft" },
    { name: "Install Laminate", price: 6.00, unit: "sqft" },
    { name: "Install Ceramic Tile", price: 14.00, unit: "sqft" },
    { name: "Carpet Removal", price: 1.50, unit: "sqft" },
  ],
  Paint: [
    { name: "Wall Painting (2 Coats)", price: 2.50, unit: "sqft" },
    { name: "Ceiling Painting", price: 2.00, unit: "sqft" },
    { name: "Trim & Baseboards", price: 3.00, unit: "lnft" },
  ],
  Electrical: [
    { name: "Install Recessed Light", price: 150.00, unit: "each" },
    { name: "Replace Outlet/Switch", price: 45.00, unit: "each" },
  ],
  Plumbing: [
    { name: "Install Toilet", price: 250.00, unit: "each" },
    { name: "Install Vanity Sink", price: 350.00, unit: "each" },
  ]
};

// Fallback mock result if API fails or key is missing
export const MOCK_ANALYSIS_RESULT = {
  totalArea: 1250,
  roomCount: 5,
  propertyType: "Residential Apartment",
  rooms: [
    {
      id: "r-1",
      name: "Living Room",
      type: "living" as const,
      areaSqFt: 450,
      boundingBox: [100, 100, 500, 600] as [number, number, number, number],
      suggestedFlooring: "hardwood",
    },
    {
      id: "r-2",
      name: "Kitchen",
      type: "kitchen" as const,
      areaSqFt: 220,
      boundingBox: [100, 600, 400, 900] as [number, number, number, number],
      suggestedFlooring: "tile",
    },
    {
      id: "r-3",
      name: "Master Bedroom",
      type: "bedroom" as const,
      areaSqFt: 300,
      boundingBox: [500, 100, 900, 500] as [number, number, number, number],
      suggestedFlooring: "carpet",
    },
    {
      id: "r-4",
      name: "Master Bath",
      type: "bathroom" as const,
      areaSqFt: 120,
      boundingBox: [500, 500, 800, 700] as [number, number, number, number],
      suggestedFlooring: "tile",
    },
    {
      id: "r-5",
      name: "Hallway",
      type: "hallway" as const,
      areaSqFt: 160,
      boundingBox: [400, 500, 500, 900] as [number, number, number, number],
      suggestedFlooring: "hardwood",
    },
  ]
};
