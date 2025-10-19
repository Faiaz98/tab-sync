import React from "react";
import WorkspaceList from "./components/WorkspaceList";
import TabList from "./components/TabList";

const App: React.FC = () => {
  return (
    <div>
      <h1>TabSync 🌐</h1>
      <WorkspaceList />
      <TabList />
    </div>
  );
};

export default App;
