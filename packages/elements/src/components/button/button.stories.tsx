import React from "react";
import { Button } from "./button";
import { ThemeProvider } from "styled-components";
import SampleTheme from "../../shared/sample-theme";
import { GlobalFontStyle } from "../../shared/global-font-style";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => <Button>Default</Button>;

export const Types = () => (
  <div>
    <Button type="primary">Primary</Button>&nbsp;
    <Button type="secondary">Secondary</Button>&nbsp;
    <Button type="danger">Danger</Button>&nbsp;
  </div>
);

export const Sizes = () => (
  <div>
    <Button size="small">Small</Button>&nbsp;
    <Button size="medium">Medium</Button>&nbsp;
    <Button size="large">Large</Button>&nbsp;
  </div>
);

export const Icons = () => (
  <div>
    <Button size="small" type="primary" icon="tick">Small Primary with Icon</Button>&nbsp;
  </div>
);

export const Combinations = () => (
  <div>
    <Button type="primary" size="small">Small Primary</Button>&nbsp;
    <Button type="secondary" size="medium">Medium Secondary</Button>&nbsp;
    <Button type="danger" size="large">Danger Large</Button>&nbsp;
  </div>
);

export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={SampleTheme}>
      <Button type="primary" size="small">
        Themed Small Primary Button
      </Button>
    </ThemeProvider>
    <GlobalFontStyle />
  </React.Fragment>
);
