import React from "react";
import { Tooltip } from "./tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
};

export const Default = () => (
  <div>
    <div style={{ margin: "60px" }}>
      <Tooltip title="Tooltip on top" position="top">
        <button>Tooltip on top</button>
      </Tooltip>
    </div>
    <div style={{ margin: "60px" }}>
      <Tooltip title="Tooltip on bottom" position="bottom">
        <button>Tooltip on Bottom</button>
      </Tooltip>
    </div>
    <div style={{ margin: "60px" }}>
      <Tooltip title="Tooltip on left" position="left">
        <button>Tooltip on left</button>
      </Tooltip>
    </div>
    <div style={{ margin: "60px" }}>
      <Tooltip title="Tooltip on right" position="right">
        <button>Tooltip on right</button>
      </Tooltip>
    </div>
  </div>
);
