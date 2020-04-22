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
}

/**
 * RadioButton component
 * This lets a user select one of a limited number of choices.
 */
export class RadioButton extends React.Component<RadioButtonProps> {
  constructor(props: RadioButtonProps) {
    super(props);
  }

  render() {
    return (
      <RadioButtonContainer>
        <div className="radio-button__label">
          <p className="radio-button__title">{this.props.children}</p>
          {!!this.props.description && (
            <p className="radio-button_description">{this.props.description}</p>
          )}
        </div>
        <input
          className="radio-button__input"
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props?.checked}
          disabled={this.props?.disabled}
        />
        <span className="radio-button__selection"></span>
      </RadioButtonContainer>
    );
  }
}
