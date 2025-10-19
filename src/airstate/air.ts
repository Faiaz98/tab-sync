import { useSharedState } from "@airstate/react";
import { v4 as uuid } from "uuid";

export type Tab = {
  id: string;
  title: string;
  url: string;
};

export type Workspace = {
  id: string;
  name: string;
  tabs: Tab[];
};

export const useWorkspaces = () => {
  const [workspaces, setWorkspaces] = useSharedState<Workspace[]>([], {
    channel: "workspaces"
  });

   const [activeWorkspaceId, setActiveWorkspaceId] = useSharedState<string | null>(null, {
    channel: "activeWorkspace"
  });

  const createWorkspace = (name: string) => {
    const newWs = { id: uuid(), name, tabs: [] };
    setWorkspaces([...workspaces, newWs]);
    setActiveWorkspaceId(newWs.id);
  };

  const addTabToActive = (tab: Tab) => {
    if (!activeWorkspaceId) return;
    setWorkspaces(
      workspaces.map(ws =>
        ws.id === activeWorkspaceId ? { ...ws, tabs: [...ws.tabs, tab] } : ws
      )
    );
  };

  const removeTabFromActive = (id: string) => {
    if (!activeWorkspaceId) return;
    setWorkspaces(
      workspaces.map(ws =>
        ws.id === activeWorkspaceId
          ? { ...ws, tabs: ws.tabs.filter(tab => tab.id !== id) }
          : ws
      )
    );
  };

  return {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspaceId,
    createWorkspace,
    addTabToActive,
    removeTabFromActive,
  };
};
