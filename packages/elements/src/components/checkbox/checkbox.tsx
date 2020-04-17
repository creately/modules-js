import React from "react";
import styled from "styled-components";
import tick from "./tick.svg";

export interface CheckboxProps {
  value: any;
  checked?: boolean;
  onChange?: Function;
}

export interface CheckboxState {
  checked: boolean;
}

const CheckboxContainer = styled.div`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.fontSize};

  .checkbox-label {
    display:        block;
    position:       relative;
    padding-left:   25px;
    margin-bottom:  12px;
    cursor:         pointer;
    user-select:    none;
  }

  .checkbox-check-mark {
    position:       absolute;
    top:            0;
    left:           0;
    height:         18px;
    width:          18px;
    border:         1px ${(props) => props.theme.primaryColor} solid;
    border-radius:  100%;
  }

  input {
    position:   absolute;
    opacity:    0;
    cursor:     pointer;
    height:     0;
    width:      0;

    &:checked ~ .checkbox-check-mark {
      background:       url("${tick}") no-repeat;
      background-size:  contain;
    }

    &:checked ~ .checkbox-check-mark:after {
      display: block;
    }
  }

  &:hover input ~ .checkbox-check-mark {
      border: 1px grey solid;
  }
`;

const defaultTheme = {
  primaryColor: "#5b5b5b",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "15px",
};

CheckboxContainer.defaultProps = {
  theme: defaultTheme,
};

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: !!props.checked,
    };
  }

  checkboxToggle = () => {
    this.setState((state) => ({ checked: !state.checked }));
    this.props.onChange?.call(this.state.checked);
  };

  render() {
    return (
      <CheckboxContainer>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value={this.props.value}
            checked={this.state.checked}
            onChange={this.checkboxToggle}
          ></input>
          <span className="checkbox-check-mark"></span>
          {this.props.children}
        </label>
      </CheckboxContainer>
    );
  }
}