import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  MonitorSmartphone, 
  Server, 
  Database, 
  Box, 
  HardDrive, 
  Layers, 
  Network
} from 'lucide-react';
import clsx from 'clsx';
import { SystemNodeData } from '../../types/flow';

export const ICON_MAP = {
  client: MonitorSmartphone,
  compute: Server,
  database: Database,
  cache: Layers,
  storage: HardDrive,
  queue: Box,
  gateway: Network
};

export const COLOR_MAP = {
  client: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  compute: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  database: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  cache: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  storage: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  queue: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
  gateway: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
};

export const SystemNodeComponent = ({ data, selected }: { data: SystemNodeData, selected?: boolean }) => {
  const Icon = ICON_MAP[data.typeStr as keyof typeof ICON_MAP] || Server;
  const colors = COLOR_MAP[data.typeStr as keyof typeof COLOR_MAP] || COLOR_MAP.compute;

  return (
    <div className={clsx(
      "px-4 py-3 rounded-lg border-2 shadow-2xl backdrop-blur-md flex items-center gap-3 min-w-[160px] font-sans transition-all", 
      colors,
      selected ? "ring-2 ring-white scale-105 shadow-white/10" : ""
    )}>
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" />
      <Handle type="target" position={Position.Left} id="left-target" className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" />
      
      <div className="p-2 bg-slate-900/50 rounded-md">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-wide text-slate-100">{data.label}</span>
        <span className="text-[10px] font-mono opacity-70 uppercase tracking-widest">{data.typeStr}</span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" />
      <Handle type="source" position={Position.Right} id="right-source" className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" />
    </div>
  );
};
