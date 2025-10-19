import React, { useState } from "react";
import { useWorkspaces } from "../airstate/air";
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

  if (!activeWorkspaceId) return null;

  const activeWorkspace = workspaces.find(ws => ws.id === activeWorkspaceId);
  if (!activeWorkspace) return null;

  const handleAdd = () => {
    if (!title.trim() || !url.trim()) return;
    addTabToActive({ id: uuid(), title: title.trim(), url: url.trim() });
    setTitle("");
    setUrl("");
  };

  return (
    <div className="tab-list">
      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Tab title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <input
          placeholder="Tab URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Browser-like Tab Bar */}
      <div className="flex gap-2 overflow-x-auto border-b pb-2 mb-4">
        {activeWorkspace.tabs.map((tab, index) => {
          const isActive = index === activeWorkspace.tabs.length - 1; // last added tab as active
          return (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-1 rounded-t-lg cursor-pointer select-none
                ${isActive ? "bg-white border-t border-l border-r border-gray-300 font-semibold" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              <a
                href={tab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate max-w-xs"
              >
                {tab.title}
              </a>
              <button
                onClick={() => removeTabFromActive(tab.id)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabList;
