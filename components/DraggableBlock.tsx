import { DraggableBlockProps } from "@/types";

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  type,
  label,
  description,
}) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing
        py-4 rounded-lg border-2 border-dashed 
        transition-all duration-200 ease-in-out
        hover:border-solid hover:shadow-lg hover:-translate-y-1 hover:scale-105
        ${
          type === "blockA"
            ? "border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 hover:border-purple-500"
            : "border-pink-300 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 hover:from-pink-100 hover:to-pink-200 hover:border-pink-500"
        }
      `}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      data-type={type}
    >
      <div className="text-center">
        <div className="text-sm font-semibold mb-2">{label}</div>
        {description && (
          <div className="text-xs opacity-80 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableBlock;
