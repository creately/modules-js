import React from 'react';
import { Checkbox } from './checkbox';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import LatoWoff from './lt-regular-webfont.woff';
import LatoWoff2 from './lt-regular-webfont.woff2';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox value="" checked={ false } />;

export const Checked = () => <Checkbox value="agree" checked={ true }>Agree</Checkbox>;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url("${LatoWoff2}") format('woff2'),
         url("${LatoWoff}") format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
`;

const theme = {
  primaryColor: 'green',
  primaryFontFamily: 'Lato'
};


export const Themed = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Checkbox value="agree" checked={ true }>Am themed</Checkbox>
    </ThemeProvider>
    <GlobalStyle />
  </React.Fragment>
);
