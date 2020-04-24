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
      Some text, some of which{" "}
      <Tooltip
        title="This is some more info about that first thing that you should find every interesting."
        position="bottom"
      >
        requires explanation.
      </Tooltip>{" "}
      (Scroll down for more.)
    </p>

    <div style={{ margin: "80px" }}>
      <Tooltip title="Title" description="Some description" position="bottom">
        <button>This button needs to explain itself</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px" }}>
      <Tooltip title="Title" description="Some description" position="top">
        <button>This button needs to explain itself</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px" }}>
      <Tooltip title="Title" description="Some description" position="right">
        <button>This button needs to explain itself</button>
      </Tooltip>
    </div>

    <div style={{ margin: "80px" }}>
      <Tooltip title="Title" description="Some description" position="left">
        <button>This button needs to explain itself</button>
      </Tooltip>
    </div>
  </div>
);
