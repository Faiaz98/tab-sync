import React, { useState } from "react";
import { useWorkspaces } from "../airstate/air";

const WorkspaceList = () => {
  const { workspaces, activeWorkspaceId, setActiveWorkspaceId, createWorkspace } = useWorkspaces();
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Workspaces</h2>
      <ul>
        {workspaces.map(ws => (
          <li
            key={ws.id}
            style={{ fontWeight: ws.id === activeWorkspaceId ? "bold" : "normal", cursor: "pointer" }}
            onClick={() => setActiveWorkspaceId(ws.id)}
          >
            {ws.name}
          </li>
        ))}
      </ul>
      <input
        placeholder="New workspace"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => { if (name) { createWorkspace(name); setName(""); }}}>
        Add Workspace
      </button>
    </div>
  );
};

export default WorkspaceList;
