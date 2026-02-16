export type RoomType = 'bedroom' | 'kitchen' | 'bathroom' | 'living' | 'hallway' | 'office' | 'garage' | 'balcony' | 'other';

export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  areaSqFt: number;
  boundingBox: [number, number, number, number]; // ymin, xmin, ymax, xmax (0-1000)
  suggestedFlooring: string;
}

export interface AnalysisResult {
  totalArea: number;
  roomCount: number;
  propertyType: string;
  rooms: Room[];
}

export type UnitType = 'sqft' | 'lnft' | 'each';

export interface EstimateItem {
  id: string;
  roomId: string;
  roomName: string;
  category: string;
  description: string;
  quantity: number;
  unit: UnitType;
  unitPrice: number;
  total: number;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  budget: string;
  status: 'Open' | 'Bidding' | 'Closed';
  postedAt: string;
  scope: string[];
  bids: number;
}