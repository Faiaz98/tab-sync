import React from "react";
import type { Tab } from "../airstate/air";

type Props = {
  tab: Tab;
  onRemove: (id: string) => void;
};

const TabItem: React.FC<Props> = ({ tab, onRemove }) => {
  return (
    <div className="tab-item">
      <a href={tab.url} target="_blank" rel="noopener noreferrer">{tab.title}</a>
      <button onClick={() => onRemove(tab.id)}>Remove</button>
    </div>
  );
};

export default TabItem;
