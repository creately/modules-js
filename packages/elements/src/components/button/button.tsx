import React from "react";
import { Icon } from "../icon/icon";
import { ButtonContainer } from "./button.style";

export interface ButtonProps {
  primary?: boolean;
  type?: string;
  size?: string;
  icon?: string;
  iconColor?: string;
  disabled?: boolean;
}

export class Button extends React.Component<ButtonProps> {
  private availableTypes = ["primary", "secondary", "danger"];
  private availableSizes = ["small", "medium", "large"];

  constructor(props: ButtonProps) {
    super(props);
  }

  getTypeClass(): string {
    if (this.props.type && this.availableTypes.includes(this.props.type)) {
      return `button-${this.props.type}`;
    } else {
      return "";
    }
  }

  getSizeClass(): string {
    if (this.props.size && this.availableSizes.includes(this.props.size)) {
      return `button-${this.props.size}`;
    } else {
      return "";
    }
  }

  getIconClass(): string {
    if (!!!this.props.icon) {
      return "";
    }
    if (!!this.props.children) {
      return "button-icon-text";
    } else {
      return "button-icon";
    }
  }

  getClasses(): string {
    return [this.getTypeClass(), this.getSizeClass(), this.getIconClass()]
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
        <span className="text">{this.props.children}</span>
      </ButtonContainer>
    );
  }
}
