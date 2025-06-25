import { Node, Edge } from "reactflow";

export interface BlockData {
  id: string;
  type: string;
  label: string;
  description?: string;
}

export interface CustomNodeData {
  label: string;
  type: string;
  description?: string;
}

export interface CustomNode extends Node {
  data: CustomNodeData;
}

export type CustomEdge = Edge;

export interface ContextMenuProps {
  id: string;
  top: number;
  left: number;
  right?: number;
  bottom?: number;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export interface DraggableBlockProps {
  type: string;
  label: string;
  description?: string;
}

export interface BlockPanelProps {
  blocks: BlockData[];
}

export interface CanvasProps {
  initialNodes?: CustomNode[];
  initialEdges?: CustomEdge[];
}

export type NodeType = "blockA" | "blockB" | "default";

export interface AppState {
  nodes: CustomNode[];
  edges: CustomEdge[];
  selectedNode: string | null;
}
