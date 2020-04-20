import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";

export const mountWithTheme = (tree: any, theme: any) => {
  const WrappingThemeProvider = (props: any) => (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  );

  return mount(tree, { wrappingComponent: WrappingThemeProvider });
};
