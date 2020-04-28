import React from "react";
import { Tooltip } from "./tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
};

const storyRoot = document.createElement("div");
storyRoot.id = "tooltip-root";
document.body.prepend(storyRoot);

export const Default = () => (
  <div>
    <p>
      Some text, some of which<em>{" "}
      <Tooltip
        title="Title"
        description="This is some more info about that first thing that you should find every interesting."
        position="bottom"
      >
        requires explanation.
      </Tooltip>{" "}</em>
    </p>

    <div style={{ margin: "80px 150px" }}>
      <Tooltip title="Title" description="Some description" position="top">
        <button style={{ height: "100px" }}>Tooltip on top</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px 150px" }}>
      <Tooltip title="Title" description="Some description" position="bottom">
        <button>Tooltip on bottom</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px 150px" }}>
      <Tooltip title="Title" description="Some description" position="right">
        <button>Tooltip on right</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px 150px" }}>
      <Tooltip title="Title" description="Some description" position="left">
        <button>Tooltip on left</button>
      </Tooltip>
    </div>
  </div>
);
