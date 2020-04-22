import { createGlobalStyle } from "styled-components";
import LatoWoff from "./lt-regular-webfont.woff";
import LatoWoff2 from "./lt-regular-webfont.woff2";

/**
 * A Global Style Component defines any styles that should be loaded globally.
 * This is useful when for example, fonts, images or any other assets are referenced
 * by a custom theme. It can also be used to set other global styles.
 */
export const GlobalFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url("${LatoWoff2}") format('woff2'),
         url("${LatoWoff}") format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
`;
