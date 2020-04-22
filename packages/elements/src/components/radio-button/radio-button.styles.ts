import styled from "styled-components";

const defaultTheme = {
  primaryColor: "#007bff",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  primaryFontColor: "black",
  borderRadius: "4px",
  baseFontSize: "15px",
};

const RadioButtonContainer = styled.label`
  font-family: ${(props) => props.theme.primaryFontFamily};
  color: ${(props) => props.theme.primaryFontColor};
  font-size: ${(props) => props.theme.baseFontSize};
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
`;

RadioButtonContainer.defaultProps = {
  theme: defaultTheme,
};

export { RadioButtonContainer };
