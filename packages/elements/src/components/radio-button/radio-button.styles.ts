import styled from "styled-components";

const defaultTheme = {
  primaryColor: "#007bff",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  baseFontSize: "15px",
  radioButton: {
    borderColor: "grey",
    borderHoverColor: "darkgrey",
    checkColor: "grey",
    disabedColor: "grey",
  },
};

const RadioButtonContainer = styled.label`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.baseFontSize};
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  padding-right: 20px;
  cursor: pointer;
  padding-left: 30px;

  .radio-button__title,
  .radio-button__description {
    display: block;
    line-height: 1.6;
  }

  .radio-button__description {
    color: grey;
  }

  .radio-button__input {
    width: 20px;
    height: 20px;
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .radio-button__selection::after {
      opacity: 1;
    }

    &:disabled,
    &[disabled] {
      ~ .radio-button__selection {
        border-color: ${(props) => props.theme.radioButton.disabledColor};
      }

      &:hover ~ .radio-button__selection {
        border-color: ${(props) => props.theme.radioButton.disabledColor};
      }

      &:checked ~ .radio-button__selection::after {
        background-color: ${(props) => props.theme.radioButton.disabledColor};
      }
    } 

    &:hover ~ .radio-button__selection {
      border-color: ${(props) => props.theme.radioButton.borderHoverColor};
    }
  }

  .radio-button__selection {
    position: absolute;
    left: 0;
    border: 1px ${(props) => props.theme.radioButton.borderColor} solid;
    width: 20px;
    height: 20px;
    border-radius: 100%;

    &::after {
      content: "";
      background-color: ${(props) => props.theme.radioButton.checkColor};
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
`;

RadioButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export { RadioButtonContainer };
