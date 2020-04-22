import React from "react";
import { CheckboxContainer } from "./checkbox.styles";

export interface CheckboxProps {
  value: any;
  checked?: boolean;
  onChange?: Function;
}

export interface CheckboxState {
  checked: boolean;
}

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
