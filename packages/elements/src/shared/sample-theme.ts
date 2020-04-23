const colors = {
  primary: "green",
  primaryAccent: "darkgreen",
  secondary: "cadetblue",
  secondaryAccent: "darkslateblue",
  danger: "crimson",
  dangerAccent: "darkred",
  disabled: "grey",
  white: "white",
  black: "black",
};

/**
 * A sample theme for consumption by a ThemeProvider component.
 */
const SampleTheme = {
  // Colors
  primaryColor: colors.primary,
  secondaryColor: colors.secondary,
  dangerColor: colors.danger,

  // Fonts
  primaryFontFamily: "Lato",
  primaryFontColor: colors.black,
  xSmallFontSize: "12px",
  smallFontSize: "13px",
  baseFontSize: "14px",
  mediumFontSize: "16px",
  largeFontSize: "18px",
  mLargeFontSize: "20px",
  xLargeFontSize: "30px",

  // Global
  globalborderRadius: "4px",

  // Buttons
  button: {
    primaryFontColor: colors.white,
    primaryHoverBackground: colors.primaryAccent,
    primaryActiveBackground: colors.primaryAccent,
    secondaryFontColor: colors.white,
    secondaryHoverBackground: colors.secondaryAccent,
    secondaryActiveBackground: colors.secondaryAccent,
    dangerFontColor: colors.white,
    dangerHoverBackground: colors.dangerAccent,
    dangerActiveBackground: colors.dangerAccent,
  },

  // Checkbox
  checkbox: {
    borderColor: colors.primary,
    borderHoverColor: colors.primaryAccent,
  },

  radioButton: {
    borderColor: "grey",
    borderHoverColor: "darkgrey",
  }
};

export default SampleTheme;
