import React from "react";
import { RadioButtonContainer } from "./radio-button.styles";

/**
 * Radio button props.
 */
export interface RadioButtonProps {
  /**
   * The value of the name attribute of the radio button.
   */
  name: string;

  /**
   * The value of the radio button.
   */
  value: any;

  /**
   * This indicates whether the button needs to be checked by default or not.
   */
  checked?: boolean;

  /**
   * This indicates whether this needs to be disable or not.
   */
  disabled?: boolean;

  /**
   * This indicates the size of the radio button. It can be small, medium or large.
   */
  size?: string;

  /**
   * Description to be shown.
   */
  description?: string;

  /**
   * A callback function for when the radio button onChange event.
   */
  onChange?: Function;
}

/**
 * Radio button state.
 */
export interface RadioButtonState {
  /**
   * Holds the current checked status of the radio button.
   */
  checked: boolean;
}

/**
 * RadioButton component
 * This lets a user select one of a limited number of choices.
 */
export class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
  constructor(props: RadioButtonProps) {
    super(props);
    this.state = {
      checked: !!props.checked,
    };
  }

  /**
   * Toggles the radio button selected state.
   */
  toggle(): void {
    this.setState((state) => ({ checked: !state.checked }));
    this.props.onChange?.call(this.state.checked, this.props.value);
  }

  render() {
    return (
      <RadioButtonContainer>
        <div className="radio-button__label">
          <span className="radio-button__title">{this.props.children}</span>
          {!!this.props.description && (
            <span className="radio-button__description">
              {this.props.description}
            </span>
          )}
        </div>
        <input
          className="radio-button__input"
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props?.checked}
          disabled={this.props?.disabled}
          onChange={() => this.toggle()}
        />
        <span className="radio-button__selection"></span>
      </RadioButtonContainer>
    );
  }
}
