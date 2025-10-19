import React from "react";
import WorkspaceList from "./components/WorkspaceList";
import TabList from "./components/TabList";

const App: React.FC = () => {
  return (
    <div className="app p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TabSync 🌐</h1>
      <WorkspaceList />
      <TabList />
    </div>
  );
};

export default App;
