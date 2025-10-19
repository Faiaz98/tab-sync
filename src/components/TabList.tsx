import React, { useState } from "react";
import { useWorkspaces, type Tab } from "../airstate/air"; // ✅ updated import
import TabItem from "./TabItem";
import { v4 as uuid } from "uuid";

const TabList: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    addTabToActive,
    removeTabFromActive,
  } = useWorkspaces();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const activeWorkspace = workspaces.find(ws => ws.id === activeWorkspaceId);

  if (!activeWorkspace) {
    return <p>No workspace selected. Create one first.</p>;
  }

  const addTab = () => {
    if (!title || !url) return;
    addTabToActive({ id: uuid(), title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>{activeWorkspace.name} – Tabs</h2>

      <input
        placeholder="Tab title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Tab URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button onClick={addTab}>Add Tab</button>

      {activeWorkspace.tabs.map((tab: Tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          onRemove={() => removeTabFromActive(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabList;
