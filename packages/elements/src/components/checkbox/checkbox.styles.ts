import styled from "styled-components";
import tick from "./tick.svg";

const defaultTheme = {
  primaryColor: "#5b5b5b",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  baseFontSize: "15px",
  checkbox: {
    borderColor: "grey",
    borderHoverColor: "darkgrey",
  },
};

const CheckboxContainer = styled.div`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.baseFontSize};

  .checkbox__label {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
  }

  .checkbox__check-mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    border: 1px ${(props) => props.theme.checkbox.borderColor} solid;
    border-radius: 100%;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkbox__check-mark {
      background: url("${tick}") no-repeat;
      background-size: contain;
    }

    &:checked ~ .checkbox__check-mark:after {
      display: block;
    }
  }

  &:hover .checkbox__input ~ .checkbox__check-mark {
      border: 1px ${(props) => props.theme.checkbox.borderHoverColor} solid;
  }
`;

CheckboxContainer.defaultProps = {
  theme: defaultTheme,
};

export { CheckboxContainer };
