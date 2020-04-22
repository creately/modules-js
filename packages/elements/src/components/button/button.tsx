import React from "react";
import { Icon } from "../icon/icon";
import { ButtonContainer } from "./button.styles";

/**
 * Button props.
 */
export interface ButtonProps {
  /**
   * The button type. Can be primary, secondary or danger.
   */
  type?: string;

  /**
   * The button size. Can be small, medium or large.
   */
  size?: string;

  /**
   * The icon for the button. Can be any icon from the nu-icon set.
   */
  icon?: string;

  /**
   * The icon color for the button. Can be black or white.
   */
  iconColor?: string;

  /**
   * Set the button disabled state.
   */
  disabled?: boolean;
}

/**
 * Basic button component with size and color variants.
 */
export class Button extends React.Component<ButtonProps> {
  /**
   * Available button types.
   */
  private availableTypes = ["primary", "secondary", "danger"];

  /**
   * Available button sizes.
   */
  private availableSizes = ["small", "medium", "large"];

  /**
   * Default class.
   */
  private defaultClass = "button";

  constructor(props: ButtonProps) {
    super(props);
  }

  /**
   * Returns a string of applicable type classes.
   */
  getTypeClass(): string {
    if (this.props.type && this.availableTypes.includes(this.props.type)) {
      return `button--${this.props.type}`;
    } else {
      return "";
    }
  }

  /**
   * Returns a string of applicable size classes.
   */
  getSizeClass(): string {
    if (this.props.size && this.availableSizes.includes(this.props.size)) {
      return `button--${this.props.size}`;
    } else {
      return "";
    }
  }

  /**
   * Returns a string of applicable icon classes.
   */
  getIconClass(): string {
    if (!!!this.props.icon) {
      return "";
    }
    if (!!this.props.children) {
      return "button--icon-text";
    } else {
      return "button--icon";
    }
  }

  /**
   * Returns a string of all applicable classes.
   */
  getClasses(): string {
    return [
      this.defaultClass,
      this.getTypeClass(),
      this.getSizeClass(),
      this.getIconClass(),
    ]
      .join(" ")
      .trim();
  }

  render() {
    return (
      <ButtonContainer
        className={this.getClasses()}
        disabled={this.props.disabled}
      >
        {!!this.props.icon && (
          <Icon name={this.props.icon} color={this.props?.iconColor} />
        )}
        <span className="button__text">{this.props.children}</span>
      </ButtonContainer>
    );
  }
}
