import React from "react";
import { Button } from "./button";
import { ThemeProvider } from "styled-components";
import SampleTheme from "../../shared/sample-theme";
import { GlobalFontStyle } from "../../shared/global-font-style";

export default {
  title: "Button",
  component: Button,
};

export const Types = () => (
  <div>
    <Button>Default</Button>&nbsp;
    <Button type="primary">Primary</Button>&nbsp;
    <Button type="secondary">Secondary</Button>&nbsp;
    <Button type="danger">Danger</Button>&nbsp;
  </div>
);

export const Disabled = () => (
  <Button type="primary" size="small" disabled>
    Disabled Primary Small
  </Button>
);

export const Sizes = () => (
  <div>
    <Button size="small">Small</Button>&nbsp;
    <Button size="medium">Medium</Button>&nbsp;
    <Button size="large">Large</Button>&nbsp;
  </div>
);

export const Icon = () => <Button size="small" icon="tick" iconColor="black" />;

export const IconWithText = () => (
  <div>
    <Button size="small" type="primary" icon="tick">
      Small Primary with Icon
    </Button>
    &nbsp;
    <Button size="medium" type="secondary" icon="tick" disabled>
      Disabled Medium Secondary with Icon and Text
    </Button>
    &nbsp;
  </div>
);

export const Combinations = () => (
  <div>
    <Button type="primary" size="small">
      Small Primary
    </Button>
    &nbsp;
    <Button type="secondary" size="medium">
      Medium Secondary
    </Button>
    &nbsp;
    <Button type="danger" size="large">
      Danger Large
    </Button>
    &nbsp;
    <br />
    <br />
    <Button type="primary" size="small" icon="tick">
      Small with Icon
    </Button>
    &nbsp;
    <Button type="primary" size="medium" icon="tick">
      Medium with Icon
    </Button>
    &nbsp;
    <Button type="primary" size="large" icon="tick">
      Large with Icon
    </Button>
  </div>
);

export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={SampleTheme}>
      <Button type="primary" size="small" icon="tick">
        Themed Small Primary with Icon and Text
      </Button>
    </ThemeProvider>
    <GlobalFontStyle />
  </React.Fragment>
);
