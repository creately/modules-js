import styled, { css } from "styled-components";

const defaultTheme = {
  primaryColor: "#007bff",
  secondaryColor: "#cc66c4",
  dangerColor: "#dc3545",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  globalborderRadius: "4px",
  baseFontSize: "15px",
  button: {
    primaryFontColor: "white",
    primaryHoverBackground: "#0065d2",
    primaryActiveBackground: "#0065d2",
    secondaryFontColor: "white",
    secondaryHoverBackground: "#a755a0",
    secondaryActiveBackground: "#a755a0",
    dangerFontColor: "white",
    dangerHoverBackground: "#c32e3d",
    dangerActiveBackground: "#c32e3d",
  },
  buttonHoverBackground: "#0065d2",
  buttonFocusBackground: "grey",
  buttonDisabledBackground: "grey",
};

function createSizeStyles() {
  let styles = "";
  [
    {
      name: "small",
      height: "30px",
      fontSize: "14px",
    },
    {
      name: "medium",
      height: "35px",
      fontSize: "16px",
    },
    {
      name: "large",
      height: "45px",
      fontSize: "18px",
    },
  ].forEach((entry) => {
    styles += `
      &.button--${entry.name} {
        height: ${entry.height};
        font-size: ${entry.fontSize || "14px"}

        &.button--square {
          width: ${entry.height};
        }
      }
    `;
  });

  return css`
    ${styles}
  `;
}

const ButtonContainer = styled.button`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.baseFontSize};
  color: white;
  border-radius: ${(props) => props.theme.globalborderRadius};
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  border: none;
  background-color: grey;
  min-height: 20px;

  &:focus {
    outline: none;
  }

  &.button--icon {
    background-color: transparent;
    color: black;
    padding-left: 2px;
    padding-right: 2px;
  }

  &:active .button--icon {
    color: ${(props) => props.theme.button.primaryActiveBackground};
  }

  &.button--icon-text {
    padding-left: 5px;

    .icon {
      vertical-align: middle;
      color: white;
    }

    .button__text {
      margin-left: 5px;
      cursor: pointer;
      user-select: 0;
      vertical-align: middle;
    }
  }

  &.button--primary {
    color: ${(props) => props.theme.button.primaryFontColor};
    background-color: ${(props) => props.theme.primaryColor};
  }

  &.button--secondary {
    color: ${(props) => props.theme.button.secondaryFontColor};
    background-color: ${(props) => props.theme.secondaryColor};
  }

  &.button--danger {
    color: ${(props) => props.theme.button.dangerFontColor};
    background-color: ${(props) => props.theme.dangerColor};
  }

  &:hover {
    &.button--primary {
      background-color: ${(props) => props.theme.button.primaryHoverBackground};
    }

    &.button--secondary {
      background-color: ${(props) =>
        props.theme.button.secondaryHoverBackground};
    }

    &.button--danger {
      background-color: ${(props) => props.theme.button.dangerHoverBackground};
    }
  }

  &:active {
    .button--primary {
      background-color: ${(props) =>
        props.theme.button.primaryActiveBackground};
    }

    &.button--secondary {
      background-color: ${(props) =>
        props.theme.button.secondaryActiveBackground};
    }

    &.button--danger {
      background-color: ${(props) => props.theme.button.dangerActiveBackground};
    }
  }

  &:disabled,
  &[disabled] {
    cursor: auto;
    background-color: ${(props) => props.theme.buttonDisabledBackground};

    &:hover {
      background-color: ${(props) => props.theme.buttonDisabledBackground};
    }

    &.button--icon {
      background-color: transparent;

      &:hover .button--icon,
      .icon {
        color: ${(props) => props.theme.buttonDisabledBackground};
      }
    }
  }

  ${createSizeStyles()};
`;

ButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export { ButtonContainer };
