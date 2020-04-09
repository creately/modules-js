import React from "react";
import { Checkbox } from "./checkbox";
import { ThemeProvider } from "styled-components";

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const Default = () => <Checkbox value="" checked={ false } />;

export const Checked = () => <Checkbox value="agree" checked={ true }>Agree</Checkbox>;

const theme = {
  primaryColor: 'green'
};

export const Themed = () => (
  <ThemeProvider theme={theme}>
    <Checkbox value="agree" checked={ true }>Am themed</Checkbox>
  </ThemeProvider>
);