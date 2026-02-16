import React, { useState, useMemo } from 'react';
import { Plus, Trash2, FileText, CheckSquare, Square } from 'lucide-react';
import { AnalysisResult, EstimateItem } from '../types';
import { COST_CATALOG } from '../constants';
import { Button, Card, Badge } from './UI';

interface CostEstimatorProps {
  analysisData: AnalysisResult | null;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ analysisData }) => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(COST_CATALOG)[0]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);

  const availableRooms = analysisData?.rooms || [];

  const handleToggleRoom = (id: string) => {
    if (selectedRooms.includes(id)) {
      setSelectedRooms(selectedRooms.filter(r => r !== id));
    } else {
      setSelectedRooms([...selectedRooms, id]);
    }
  };

  const handleSelectAllRooms = () => {
    if (selectedRooms.length === availableRooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(availableRooms.map(r => r.id));
    }
  };

  const addItem = () => {
    // @ts-ignore
    const task = COST_CATALOG[selectedCategory][selectedTaskIndex];
    
    const newItems: EstimateItem[] = selectedRooms.map(roomId => {
      const room = availableRooms.find(r => r.id === roomId)!;
      let qty = 0;
      
      if (task.unit === 'sqft') qty = room.areaSqFt;
      else if (task.unit === 'lnft') qty = Math.ceil(Math.sqrt(room.areaSqFt) * 4);
      else if (task.unit === 'each') qty = 1;

      return {
        id: Math.random().toString(36).substr(2, 9),
        roomId: room.id,
        roomName: room.name,
        category: selectedCategory,
        description: task.name,
        quantity: qty,
        unit: task.unit,
        unitPrice: task.price,
        total: qty * task.price
      };
    });

    setEstimateItems([...estimateItems, ...newItems]);
    setSelectedRooms([]); // Reset selection after add
  };

  const removeItem = (id: string) => {
    setEstimateItems(estimateItems.filter(i => i.id !== id));
  };

  const grandTotal = useMemo(() => estimateItems.reduce((acc, curr) => acc + curr.total, 0), [estimateItems]);

  if (!analysisData) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm m-4">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <FileText size={32} className="opacity-40" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">No Analysis Data</h3>
        <p className="text-sm">Complete a blueprint takeoff first to generate estimates.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Scope Builder (Left) */}
      <div className="w-80 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-1">1. Select Scope</h3>
            <p className="text-xs text-slate-500">Choose rooms to apply costs to.</p>
          </div>
          
          <div className="p-3 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <button 
                onClick={handleSelectAllRooms}
                className="text-xs font-medium text-slate-600 flex items-center gap-2 px-2 hover:text-slate-900"
            >
              {selectedRooms.length === availableRooms.length && availableRooms.length > 0 ? (
                  <CheckSquare size={16} className="text-slate-900" />
              ) : (
                  <Square size={16} className="text-slate-400" />
              )}
              Select All Rooms
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {availableRooms.map(room => {
                const isSelected = selectedRooms.includes(room.id);
                return (
                    <div 
                        key={room.id} 
                        onClick={() => handleToggleRoom(room.id)}
                        className={`
                            flex items-center gap-3 p-3 mb-1 rounded-lg cursor-pointer transition-all border
                            ${isSelected 
                                ? 'bg-slate-50 border-slate-200 shadow-sm' 
                                : 'bg-white border-transparent hover:bg-slate-50'}
                        `}
                    >
                        {isSelected ? <CheckSquare size={18} className="text-slate-900 shrink-0" /> : <Square size={18} className="text-slate-300 shrink-0" />}
                        <div className="flex-1">
                            <div className={`text-sm font-medium ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{room.name}</div>
                            <div className="text-[10px] text-slate-400">{room.areaSqFt} sqft</div>
                        </div>
                    </div>
                );
            })}
          </div>
        </Card>

        <Card className="flex-none p-5 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">2. Add Line Item</h3>
            <p className="text-xs text-slate-500 mb-4">Apply task cost to selected rooms.</p>
            
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wide">Category</label>
            <div className="relative mb-3">
                <select 
                className="w-full text-sm border-slate-200 rounded-lg bg-slate-50 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 appearance-none font-medium text-slate-700"
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedTaskIndex(0);
                }}
                >
                {Object.keys(COST_CATALOG).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wide">Task</label>
            <div className="relative mb-6">
                <select 
                className="w-full text-sm border-slate-200 rounded-lg bg-slate-50 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 appearance-none font-medium text-slate-700"
                value={selectedTaskIndex}
                onChange={(e) => setSelectedTaskIndex(Number(e.target.value))}
                >
                {/* @ts-ignore */}
                {COST_CATALOG[selectedCategory].map((task: any, idx: number) => (
                    <option key={idx} value={idx}>{task.name} (${task.price}/{task.unit})</option>
                ))}
                </select>
            </div>

            <Button onClick={addItem} disabled={selectedRooms.length === 0} className="w-full h-10 shadow-sm">
              <Plus size={16} /> Add to Estimate
            </Button>
          </div>
        </Card>
      </div>

      {/* Estimate Sheet (Right) */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-end bg-white">
           <div>
             <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-slate-900">Project Estimation</h2>
                <Badge color="blue">Draft</Badge>
             </div>
             <p className="text-xs text-slate-500 font-medium">Created on {new Date().toLocaleDateString()}</p>
           </div>
           <div className="text-right">
             <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Estimated Total</div>
             <div className="text-3xl font-mono font-bold text-slate-900 tracking-tight">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
           </div>
        </div>

        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 font-semibold w-1/3">Description</th>
                <th className="px-6 py-3 font-semibold">Location</th>
                <th className="px-6 py-3 font-semibold text-right">Qty</th>
                <th className="px-6 py-3 font-semibold text-right">Unit Price</th>
                <th className="px-6 py-3 font-semibold text-right">Total</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {estimateItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                            <Plus size={24} className="opacity-50" />
                        </div>
                        <p className="font-medium text-slate-600 mb-1">No items yet</p>
                        <p className="text-xs max-w-xs leading-relaxed">Select rooms and tasks from the sidebar to start building your estimate.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                estimateItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 group transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{item.description}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <Badge>{item.roomName}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-slate-500">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-slate-500">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-slate-900">${item.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <Button variant="secondary">Export CSV</Button>
          <Button variant="primary">Generate Proposal PDF</Button>
        </div>
      </Card>
    </div>
  );
};