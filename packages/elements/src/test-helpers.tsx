import React from "react";
import { ThemeProvider } from "styled-components";
import { mount, shallow } from "enzyme";

export function mountWithTheme(child: React.ReactElement, theme: {}) {
  return mount(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
}

export function shallowWithTheme(child: React.ReactElement, theme: {}) {
  return shallow(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
}
