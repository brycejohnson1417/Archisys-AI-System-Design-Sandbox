import { Node, Edge } from '@xyflow/react';

export type NodeType = 'client' | 'compute' | 'database' | 'cache' | 'storage' | 'queue' | 'gateway';

export interface SystemNodeData extends Record<string, unknown> {
  label: string;
  typeStr: NodeType;
  description?: string;
}

export type SystemNode = Node<SystemNodeData>;
export type SystemEdge = Edge;
