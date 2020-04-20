import React from "react";
import styled, { css } from "styled-components";
import symbols from "../../shared/symbol-defs.svg";

export interface ButtonProps {
  primary?: boolean;
  type?: string;
  size?: string;
  icon?: string;
}

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
      &.button-${entry.name} {
        height: ${entry.height};
        font-size: ${entry.fontSize || "14px"}

        &.button-square {
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
  color: ${(props) => props.theme.primaryFontColor};
  font-size: ${(props) => props.theme.baseFontSize};
  border-radius: ${(props) => props.theme.borderRadius};
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: grey;
  min-height: 20px;

  &:focus {
    outline: none;
  }

  &.button-icon {
    background: transparent;
  }

  &:active .button-icon {
    color: ${(props) => props.theme.button.primaryActiveBackground};
  }

  &.button-icon-text {
    padding-left: 5px;

    .icon {
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
      width: 25px;
      height: 25px;
      display: inline-block;
      vertical-align: middle;
      color: white;
    }

    .text {
      margin-left: 5px;
      cursor: pointer;
      user-select: 0;
      vertical-align: middle;
    }
  }

  &:disabled,
  &[disabled] {
    cursor: auto;
    background-color: ${(props) => props.theme.buttonDisabledBackground};

    &.button-icon {
      background-color: transparent;

      &:hover .icon,
      .icon {
        color: ${(props) => props.theme.buttonDisabledBackground};
      }
    }
  }

  &.button-primary {
    background-color: ${(props) => props.theme.primaryColor};
  }

  &.button-secondary {
    background-color: ${(props) => props.theme.secondaryColor};
  }

  &.button-danger {
    background-color: ${(props) => props.theme.dangerColor};
  }

  &:hover {
    &.button-primary {
      background-color: ${(props) => props.theme.button.primaryHoverBackground};
    }

    &.button-secondary {
      background-color: ${(props) =>
        props.theme.button.secondaryHoverBackground};
    }

    &.button-danger {
      background-color: ${(props) => props.theme.button.dangerHoverBackground};
    }
  }

  &:active {
    .button-primary {
      background-color: ${(props) =>
        props.theme.button.primaryActiveBackground};
    }

    &.button-secondary {
      background-color: ${(props) =>
        props.theme.button.secondaryActiveBackground};
    }

    &.button-danger {
      background-color: ${(props) => props.theme.button.dangerActiveBackground};
    }
  }

  ${createSizeStyles()};
`;

const defaultTheme = {
  primaryColor: "#007bff",
  secondaryColor: "#cc66c4",
  dangerColor: "#dc3545",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  primaryFontColor: "white",
  borderRadius: "4px",
  baseFontSize: "15px",
  button: {
    primaryHoverBackground: "#0065d2",
    primaryActiveBackground: "#0065d2",
    secondaryHoverBackground: "#a755a0",
    secondaryActiveBackground: "#a755a0",
    dangerHoverBackground: "#c32e3d",
    dangerActiveBackground: "#c32e3d",
  },
  buttonHoverBackground: "#0065d2",
  buttonFocusBackground: "grey",
  buttonDisabledBackground: "grey",
};

ButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  getTypeClass(): string {
    switch (this.props?.type) {
      case "primary":
      case "secondary":
      case "danger":
        return `button-${this.props?.type}`;
      default:
        return "";
    }
  }

  getSizeClass(): string {
    switch (this.props?.size) {
      case "small":
      case "medium":
      case "large":
        return `button-${this.props?.size}`;
      default:
        return "";
    }
  }

  getClasses(): string {
    return [
      this.getTypeClass(),
      this.getSizeClass(),
      !!this.props.icon ? 'button-icon-text' : '' 
    ].join(" ");
  }

  render() {
    const classes = this.getClasses();
    const url = (symbols as string) + "#nu-ic-share";
    
    return (
      <ButtonContainer className={classes}>
        {!!this.props.icon &&
          <svg className="icon">
            <use xlinkHref={url} />
          </svg>
        }
        <span className="text">
          {this.props.children}
        </span>
      </ButtonContainer>
    );
  }
}
