import React from 'react';
import { NodeType } from '../../types/flow';
import { ICON_MAP, COLOR_MAP } from './SystemNodeComponent';
import clsx from 'clsx';
import { Play, Sparkles } from 'lucide-react';

interface SidebarProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const Sidebar = ({ onAnalyze, isAnalyzing }: SidebarProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeTypes: NodeType[] = ['client', 'gateway', 'compute', 'database', 'cache', 'queue', 'storage'];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col h-full z-10 z-[1000] shadow-xl relative">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-gemini-400">
           <div className="p-1.5 bg-gemini-500/20 rounded-md">
             <Sparkles size={18} />
           </div>
           <h1 className="text-xl font-bold tracking-tight text-white">Archisys</h1>
        </div>
        <p className="text-xs text-slate-400">Drag components onto the canvas to construct your architecture.</p>
      </div>
      
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 pb-4">
        {nodeTypes.map((type) => {
          const Icon = ICON_MAP[type];
          return (
            <div
              key={type}
              onDragStart={(event) => onDragStart(event, type)}
              draggable
              className={clsx(
                "flex items-center gap-3 p-3 rounded-md border-2 cursor-grab active:cursor-grabbing hover:bg-slate-800/80 transition-colors",
                COLOR_MAP[type].replace('bg-', 'bg-').split(' ')[1] // Use the border color
              )}
            >
              <div className="p-1.5 bg-slate-950/50 rounded-md text-white">
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium text-slate-200 capitalize">{type}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 mt-auto">
        <button 
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition-all shadow-lg active:scale-95"
        >
          {isAnalyzing ? (
            <div className="animate-spin w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full" />
          ) : (
            <Play size={18} className="fill-slate-900" />
          )}
          <span>{isAnalyzing ? "Analyzing..." : "Review Architecture"}</span>
        </button>
      </div>
    </aside>
  );
};
