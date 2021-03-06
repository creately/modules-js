import React from "react";
import { Icon } from "./icon";

export default {
  title: "Icon",
  component: Icon,
};

export const Default = () => <Icon name="tick" />;

export const Sizes = () => (
  <div>
    <Icon name="tick" size="xsmall" />
    <Icon name="tick" size="small" />
    <Icon name="tick" size="medium" />
    <Icon name="tick" size="large" />
  </div>
);

export const Colors = () => (
  <div>
    <div>
      Black&nbsp;
      <Icon name="tick" color="black" />
    </div>
    <div style={{ color: "white", backgroundColor: "black" }}>
      White&nbsp;
      <Icon name="tick" color="white" />
    </div>
  </div>
);
