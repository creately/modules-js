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
    <RadioButton name="gender" value="male">
      Male
    </RadioButton>
    <RadioButton name="gender" value="female">
      Female
    </RadioButton>
  </div>
);

export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={SampleTheme}>
      <RadioButton name="gender" value="male">
        Male
      </RadioButton>
      <RadioButton name="gender" value="female">
        Female
      </RadioButton>
    </ThemeProvider>
    <GlobalFontStyle />
  </React.Fragment>
);
