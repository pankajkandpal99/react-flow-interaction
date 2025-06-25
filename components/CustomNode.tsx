import { CustomNodeData } from "@/types";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`
        relative px-4 py-3 shadow-lg rounded-lg border-2 min-w-[150px] 
        transition-all duration-200 cursor-move
        ${selected ? "border-blue-500 shadow-xl" : "border-gray-300"}
        ${
          data.type === "blockA"
            ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-500"
            : data.type === "blockB"
            ? "bg-gradient-to-r from-pink-400 to-red-500 text-white border-pink-500"
            : "bg-white text-gray-800"
        }
        hover:shadow-xl hover:scale-105
        active:cursor-grabbing
      `}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full !top-[-8px] !left-[50%] !transform !-translate-x-1/2 hover:!scale-125 transition-transform"
        style={{
          background: "#3b82f6",
          border: "2px solid white",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
        }}
      />

      {/* Node Content - This is the drag handle area */}
      <div className="flex flex-col items-center text-center space-y-1 drag-handle">
        <div className="text-sm font-normal">{data.label}</div>
        {data.description && (
          <div className="text-xs opacity-90">{data.description}</div>
        )}
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !rounded-full !bottom-[-8px] !left-[50%] !transform !-translate-x-1/2 hover:!scale-125 transition-transform"
        style={{
          background: "#3b82f6",
          border: "2px solid white",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default CustomNode;
