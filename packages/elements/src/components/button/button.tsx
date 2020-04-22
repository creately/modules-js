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
  constructor(props: ButtonProps) {
    super(props);
  }

  getTypeClass(): string {
    switch (this.props?.type) {
      case "primary":
      case "secondary":
      case "danger":
        return `button-${this.props.type}`;
      default:
        return "";
    }
  }

  getSizeClass(): string {
    switch (this.props?.size) {
      case "small":
      case "medium":
      case "large":
        return `button-${this.props.size}`;
      default:
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
