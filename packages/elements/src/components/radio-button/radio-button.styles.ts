import styled, { css } from "styled-components";

const defaultTheme = {
  primaryColor: "#5b5b5b",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  baseFontSize: "15px",
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
      &.radio-button__${entry.name} {
        height: ${entry.height};
        font-size: ${entry.fontSize || "14px"}
      }
    `;
  });

  return css`
    ${styles}
  `;
}

const RadioButtonContainer = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  padding-right: 20px;
  cursor: pointer;
  padding-left: 30px;

  input {
    width: 20px;
    height: 20px;
  }

  .radio-button__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .radio-button__selection {
    position: absolute;
    left: 0;
    border: 1px ${(props) => props.theme.primaryColor} solid;
    width: 20px;
    height: 20px;
    border-radius: 100%;

    &:after {
      content: "";
      background-color: grey;
      border-radius: inherit;
      opacity: 0;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      position: absolute;
      transition: opacity 0.2s linear;
      width: 10px;
      height: 10px;
    }
  }

  .radio-button__input:checked ~ .radio-button__selection:after {
    opacity: 1;
  }

  ${createSizeStyles()};
`;

RadioButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export { RadioButtonContainer };
