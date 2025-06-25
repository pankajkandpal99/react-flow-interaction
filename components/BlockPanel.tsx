import { BlockPanelProps } from "@/types";
import DraggableBlock from "./DraggableBlock";

const BlockPanel: React.FC<BlockPanelProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col gap-y-2 w-80 h-full bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Drag & Drop Blocks
        </h3>
        <p className="text-sm text-gray-600">
          Drag blocks to the canvas to create your flow
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-y-2">
          {blocks.map((block) => (
            <DraggableBlock
              key={block.id}
              type={block.type}
              label={block.label}
              description={block.description}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-2 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 mt-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Instructions:
        </h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2 font-bold">•</span>
            Drag blocks from here to canvas
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2 font-bold">•</span>
            Right-click nodes to delete them
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2 font-bold">•</span>
            Connect nodes by dragging from handles
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2 font-bold">•</span>
            Use mouse wheel to zoom in/out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlockPanel;
