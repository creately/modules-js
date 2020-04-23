import React from "react";
import { RadioButton } from "./radio-button";
import { ThemeProvider } from "styled-components";
import SampleTheme from "../../shared/sample-theme";
import { GlobalFontStyle } from "../../shared/global-font-style";

export default {
  title: "RadioButton",
  component: RadioButton,
};

export const Default = () => (
  <div>
    <RadioButton name="demo" value="demo_1">
      Radio 1
    </RadioButton>
    <RadioButton name="demo" value="demo_2">
      Radio 2
    </RadioButton>
  </div>
);

export const WithDescription = () => (
  <div>
    <RadioButton name="demo" value="demo_1" description="Radio 1 description" onChange={callback}>
      Radio 1
    </RadioButton>
    <RadioButton name="demo" value="demo_2" description="Radio 2 description" onChange={callback}>
      Radio 2
    </RadioButton>
  </div>
);

export const WithDisabledOptions = () => (
  <div>
    <RadioButton name="demo" value="demo_1" description="Radio 1 description">
      Radio 1
    </RadioButton>
    <RadioButton name="demo" value="demo_2" description="Radio 2 description" disabled>
      Radio 2 (Disabled)
    </RadioButton>
  </div>
);

export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={SampleTheme}>
      <RadioButton name="demo" value="demo_1">
        Radio 1
      </RadioButton>
      <RadioButton name="demo" value="demo_2" description="Radio 2 description" disabled>
        Radio 2
      </RadioButton>
      <RadioButton name="demo" value="demo_3" description="Radio 3 description" checked>
        Radio 2
      </RadioButton>
    </ThemeProvider>
    <GlobalFontStyle />
  </React.Fragment>
);
