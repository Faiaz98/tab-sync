import React, { useState, useEffect } from "react";
import { useWorkspaces } from "../airstate/air";

const WorkspaceList: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspaceId,
    createWorkspace,
  } = useWorkspaces();

  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    createWorkspace(name.trim()); // activeWorkspaceId is already set inside
    setName("");
  };

  // Auto-select first workspace if none is active
  useEffect(() => {
    if (!activeWorkspaceId && workspaces.length > 0) {
      setActiveWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, activeWorkspaceId, setActiveWorkspaceId]);

  return (
    <div className="workspace-list p-2 border mb-4">
      <h2 className="text-lg font-semibold mb-2">Workspaces</h2>

      <div className="flex flex-wrap gap-2 mb-2">
        {workspaces.map(ws => (
          <button
            key={ws.id}
            onClick={() => setActiveWorkspaceId(ws.id)}
            className={`px-3 py-1 rounded ${
              ws.id === activeWorkspaceId ? "bg-blue-500 text-white font-bold" : "bg-gray-200"
            }`}
          >
            {ws.name} ({ws.tabs.length}) {/* Show tab count */}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          placeholder="New workspace"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default WorkspaceList;
