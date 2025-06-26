"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  ReactFlowInstance,
  Node,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import ContextMenu from "./ContextMenu";
import { CustomNode as CustomNodeType, CustomEdge } from "@/types";
import { useContextMenu } from "@/hooks/useContextMenu";

const nodeTypes = {
  blockA: CustomNode,
  blockB: CustomNode,
  default: CustomNode,
};

interface CanvasProps {
  initialNodes?: CustomNodeType[];
  initialEdges?: CustomEdge[];
}

const Canvas: React.FC<CanvasProps> = ({
  initialNodes = [],
  initialEdges = [],
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { contextMenu, showContextMenu, hideContextMenu } = useContextMenu();

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      console.log("Attempting to connect:", params);

      // Check if connection already exists (same direction)
      const existingConnection = edges.find(
        (edge) => edge.source === params.source && edge.target === params.target
      );

      if (existingConnection) {
        console.log("Connection already exists, preventing duplicate");
        return;
      }

      // Check if reverse connection exists (prevent bidirectional)
      const reverseConnection = edges.find(
        (edge) => edge.source === params.target && edge.target === params.source
      );

      if (reverseConnection) {
        console.log(
          "Reverse connection exists, preventing bidirectional connection"
        );
        alert(
          "Connection not allowed: Reverse connection already exists between these nodes!"
        );
        return;
      }

      console.log("Creating new connection:", params);
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges, edges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (!position) return;

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `${type === "blockA" ? "Block A" : "Block B"}`,
          type: type,
          description: `New ${type} node`,
        },
        dragHandle: ".drag-handle",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      console.log("Right click on node:", node.id);
      showContextMenu(event, node.id);
    },
    [showContextMenu]
  );

  const onPaneClick = useCallback(() => {
    hideContextMenu();
  }, [hideContextMenu]);

  const onDeleteNode = useCallback(() => {
    console.log("Deleting node:", contextMenu?.id);
    if (contextMenu) {
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== contextMenu.id && edge.target !== contextMenu.id
        )
      );
      hideContextMenu();
    }
  }, [contextMenu, setNodes, setEdges, hideContextMenu]);

  const onDuplicateNode = useCallback(() => {
    console.log("Duplicating node:", contextMenu?.id);
    if (contextMenu) {
      const nodeToDuplicate = nodes.find((node) => node.id === contextMenu.id);
      if (nodeToDuplicate) {
        const newNode: Node = {
          ...nodeToDuplicate,
          id: `${nodeToDuplicate.type}-${Date.now()}`,
          position: {
            x: nodeToDuplicate.position.x + 50,
            y: nodeToDuplicate.position.y + 50,
          },
          data: {
            ...nodeToDuplicate.data,
            label: `${nodeToDuplicate.data.label} (Copy)`,
          },
          dragHandle: ".drag-handle",
        };
        setNodes((nds) => nds.concat(newNode));
      }
      hideContextMenu();
    }
  }, [contextMenu, nodes, setNodes, hideContextMenu]);

  return (
    <div
      className="w-full h-full relative bg-background"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
        }}
        fitView
        fitViewOptions={{
          padding: 0.3,
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.3}
        maxZoom={1.5}
        snapToGrid={true}
        snapGrid={[20, 20]}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
      >
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            if (node.data?.type === "blockA") return "#8b5cf6";
            if (node.data?.type === "blockB") return "#ec4899";
            return "#6b7280";
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          // color="#d1d5db"
        />
      </ReactFlow>

      {contextMenu && (
        <ContextMenu
          id={contextMenu.id}
          top={contextMenu.top}
          left={contextMenu.left}
          right={contextMenu.right}
          bottom={contextMenu.bottom}
          onClose={hideContextMenu}
          onDelete={onDeleteNode}
          onDuplicate={onDuplicateNode}
        />
      )}
    </div>
  );
};

const CanvasWithProvider: React.FC<CanvasProps> = (props) => (
  <ReactFlowProvider>
    <Canvas {...props} />
  </ReactFlowProvider>
);

export default CanvasWithProvider;
