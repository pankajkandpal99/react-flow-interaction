import { useState, useCallback, useEffect } from "react";

interface ContextMenuState {
  id: string;
  top: number;
  left: number;
  right?: number;
  bottom?: number;
}

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const showContextMenu = useCallback(
    (event: React.MouseEvent, nodeId: string) => {
      event.preventDefault();
      event.stopPropagation();

      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Calculate position to prevent menu from going off-screen
      const menuWidth = 120;
      const menuHeight = 80;

      let left = clientX;
      let top = clientY;
      let right: number | undefined;
      let bottom: number | undefined;

      if (clientX + menuWidth > innerWidth) {
        right = innerWidth - clientX;
        left = clientX - menuWidth;
      }

      if (clientY + menuHeight > innerHeight) {
        bottom = innerHeight - clientY;
        top = clientY - menuHeight;
      }

      setContextMenu({
        id: nodeId,
        top,
        left,
        right,
        bottom,
      });
    },
    []
  );

  const hideContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Close context menu on outside click or escape key
  useEffect(() => {
    const handleClick = () => hideContextMenu();
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideContextMenu();
      }
    };

    if (contextMenu) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [contextMenu, hideContextMenu]);

  return {
    contextMenu,
    showContextMenu,
    hideContextMenu,
  };
};
