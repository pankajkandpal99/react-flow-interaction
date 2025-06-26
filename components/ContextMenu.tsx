/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContextMenuProps } from "@/types";

const ContextMenu: React.FC<ContextMenuProps> = ({
  id,
  top,
  left,
  right,
  bottom,
  onClose,
  onDelete,
  onDuplicate,
}) => {
  return (
    <div
      className="context-menu fixed bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 min-w-[120px]"
      style={{
        top: bottom !== undefined ? undefined : top,
        left: right !== undefined ? undefined : left,
        right: right,
        bottom: bottom,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col">
        <div className="px-3 py-2 text-sm text-center text-gray-800 font-medium border-b border-gray-100">
          Hello World
        </div>
        <button
          className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete Node
        </button>
        <button
          className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-150"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
