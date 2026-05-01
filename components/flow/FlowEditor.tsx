import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SystemNodeComponent } from './SystemNodeComponent';
import { Sidebar } from './Sidebar';
import { AnalysisPanel } from './AnalysisPanel';
import { NodeType, SystemNode } from '../../types/flow';
import { analyzeArchitecture, ArchitectureReview } from '../../services/geminiService';

const nodeTypes = {
  systemNode: SystemNodeComponent,
};

let id = 0;
const getId = () => `node_${id++}_${Date.now().toString(36)}`;

const generateLabel = (type: NodeType) => {
  const map: Record<NodeType, string> = {
    client: 'Web Client',
    compute: 'API Server',
    database: 'Database',
    cache: 'Cache Layer',
    storage: 'Object Storage',
    queue: 'Message Queue',
    gateway: 'API Gateway',
  };
  return map[type];
};

const initialNodes: SystemNode[] = [
  {
    id: '1',
    type: 'systemNode',
    position: { x: 250, y: 150 },
    data: { label: 'Web Client', typeStr: 'client' },
  },
  {
    id: '2',
    type: 'systemNode',
    position: { x: 500, y: 150 },
    data: { label: 'API Server', typeStr: 'compute' },
  },
  {
    id: '3',
    type: 'systemNode',
    position: { x: 750, y: 150 },
    data: { label: 'Primary DB', typeStr: 'database' },
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
];

const FlowEditorInitial = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<SystemNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [review, setReview] = useState<ArchitectureReview | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) || { x: event.clientX - 200, y: event.clientY - 100 };

      const newNode: SystemNode = {
        id: getId(),
        type: 'systemNode',
        position,
        data: { 
          label: generateLabel(type),
          typeStr: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const handleAnalyze = async () => {
    if (nodes.length === 0) return;
    setIsAnalyzing(true);
    setReview(null);
    try {
      const cleanNodes = nodes.map(n => ({
        id: n.id,
        type: n.data.typeStr,
        label: n.data.label
      }));
      
      const cleanEdges = edges.map(e => ({
        source: nodes.find(n => n.id === e.source)?.data.label || e.source,
        target: nodes.find(n => n.id === e.target)?.data.label || e.target,
      }));

      const result = await analyzeArchitecture(cleanNodes, cleanEdges);
      setReview(result);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex w-full h-full relative">
      <Sidebar onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      
      <div className="flex-1 h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-950"
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <Background color="#334155" variant={BackgroundVariant.Dots} gap={24} size={2} />
          <Controls className="fill-slate-200" style={{ display: 'flex', gap: '5px', padding: '5px', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }} />
        </ReactFlow>
      </div>

      <AnalysisPanel review={review} onClose={() => setReview(null)} />
    </div>
  );
};

export const FlowEditor = () => (
  <ReactFlowProvider>
    <FlowEditorInitial />
  </ReactFlowProvider>
);
