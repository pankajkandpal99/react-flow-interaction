import { NodeType } from '@/types';

export const BLOCK_TYPES: Record<string, NodeType> = {
  BLOCK_A: 'blockA',
  BLOCK_B: 'blockB',
  DEFAULT: 'default'
} as const;

export const NODE_WIDTH = 150;
export const NODE_HEIGHT = 40;

export const DEFAULT_VIEWPORT = {
  x: 0,
  y: 0,
  zoom: 1
};

export const GRID_SIZE = 20;

export const CONNECTION_LINE_STYLE = {
  strokeWidth: 2,
  stroke: '#2563eb'
};

export const EDGE_OPTIONS = {
  animated: true,
  style: {
    strokeWidth: 2,
    stroke: '#2563eb'
  }
};

export const NODE_DRAG_THRESHOLD = 5;