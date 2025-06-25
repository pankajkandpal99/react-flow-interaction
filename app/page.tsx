'use client';
import BlockPanel from '@/components/BlockPanel';
import Canvas from '@/components/Canvas';
import { BlockData } from '@/types';
import React from 'react';
import blocksData from "@/data/blocks.json";

export default function Home() {
  const blocks: BlockData[] = blocksData;

  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full">
        <Canvas />
      </div>
      <BlockPanel blocks={blocks} />
    </div>
  );
}