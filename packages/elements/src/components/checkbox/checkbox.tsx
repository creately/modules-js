import React from "react";
import { CheckboxContainer } from "./checkbox.styles";

/**
 * Checkbox props.
 */
export interface CheckboxProps {
  /**
   * The value for the checkbox.
   */
  value: any;

  /**
   * Indicates whether the checkbox is checked.
   */
  checked?: boolean;

  /**
   * A callback function for when the checkbox onChange event.
   */
  onChange?: Function;
}

/**
 * Checkbox state.
 */
export interface CheckboxState {
  /**
   * Holds the current checked status of the checkbox.
   */
  checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: !!props.checked,
    };
  }

  /**
   * Toggles the checkbox checked state.
   */
  checkboxToggle(): void {
    this.setState((state) => ({ checked: !state.checked }));
    this.props.onChange?.call(this.state.checked);
  }

  render() {
    return (
      <CheckboxContainer>
        <label className="checkbox__label">
          <input
            className="checkbox__input"
            type="checkbox"
            value={this.props.value}
            checked={this.state.checked}
            onChange={() => this.checkboxToggle()}
          ></input>
          <span className="checkbox__check-mark"></span>
          <span className="checkbox__text">{this.props.children}</span>
        </label>
      </CheckboxContainer>
    );
  }
}
