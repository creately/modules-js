import React from "react";
import { Checkbox } from "./checkbox";
import { ThemeProvider } from "styled-components";
import SampleTheme from "../../shared/sample-theme";
import GlobalFontStyle from "../../shared/global-font-style";

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const Default = () => <Checkbox value="" checked={false} />;

export const WithText = () => (
  <Checkbox value="agree" checked={true}>
    I Agree
  </Checkbox>
);

/**
 * A theme can be passed to a ThemeProvider wrapping any components that need to be themed.
 * If custom fonts are used, they will need to be defined in a Global Style Component.
 * See {@link SampleTheme} and See {@link GlobalFontStyle} for more details.
 */
export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={SampleTheme}>
      <Checkbox value="agree" checked={true}>
        I am themed
      </Checkbox>
    </ThemeProvider>
    <GlobalFontStyle />
  </React.Fragment>
);
