import React from "react";
import styled, { css } from "styled-components";

export interface ButtonProps {
  primary?: boolean;
}

function createCSS() {
  let styles = "";
  [
    {
      name: 'large',
      height: "45px",
      fontSize: "18px",
    },
    {
      name: 'medium',
      height: "45px",
      fontSize: "16px",
    },
    {
      name: "small",
      height: "30px",
      fontSize: "14px",
    },
  ].forEach(entry => {
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

  console.log(styles);

  return css`
    ${styles}
  `;
}

const ButtonContainer = styled.button`
  font-family:      ${(props) => props.theme.primaryFontFamily};
  border-radius:    ${(props) => props.theme.borderRadius};
  padding-left:     10px;
  padding-right:    10px;
  cursor:           pointer;
  border:           none;
  color:            white;

  &.secondary {
    color:              ${(props) => props.theme.primaryFontColor};
  }

  &.button-outlined {
    background-color:   transparent;
  }

  &:hover {
    background-color:   ${(props) => props.theme.buttonHoverBackground};
    color:              white;
  }

  &:active {
    background-color:   ${(props) => props.theme.buttonHoverFocus};
    color:              white;
  }
  
  &:focus {
    outline:            none;
  }

  &.active .icon {
    color:              ${(props) => props.theme.buttonHoverBackground};
  }

  ${createCSS()};
`;

const defaultTheme = {
  primaryColor: "#5b5b5b",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  primaryFontColor: "blue",
  borderRadius: "4px",
  fontSize: "15px",
  buttonHoverBackground: "teal",
  buttonHoverFocus: "grey",
};

ButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export const Button: React.FC<ButtonProps> = (props) => {
  const className = props?.primary ? "button primary" : "button button-large";
  return <ButtonContainer className={className}>{props.children}</ButtonContainer>;
};
