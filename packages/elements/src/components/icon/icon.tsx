import React from "react";
import { IconContainer } from "./icon.styles";
import icons from "./icons.svg";

/**
 * Icons accept props for the icon name and size.
 */
export interface IconProps {
  /**
   * Name should be selected from the imported {@link icons} file,
   * without the 'nu-ic-' prefix. E.g. 'tick'.
   */
  name: any;

  /**
   * Size can be xsmall, small, medium or large.
   */
  size?: string;

  /**
   * Color can be an html color value, else the icon will inherit color from it's parent.
   */
  color?: string;
}

/**
 * Icons can be used within any component.
 * They render an inline svg, inherit color from their parent components,
 * and have no interactions with themes.
 */
export class Icon extends React.Component<IconProps> {
  private availableColors = ["black", "white"];
  private availableSizes = ["xsmall", "small", "medium", "large"];

  constructor(props: IconProps) {
    super(props);
  }

  getIconUrl(): string {
    return `${icons as string}#nu-ic-${this.props.name}`;
  }

  getColorClass(): string {
    if (this.props.color && this.availableColors.includes(this.props.color)) {
      return `icon-${this.props.color}`;
    } else {
      return "";
    }
  }

  getSizeClass(): string {
    if (this.props.size && this.availableSizes.includes(this.props.size)) {
      return `icon-${this.props.size}`;
    } else {
      return "";
    }
  }

  getClasses(): string {
    return [this.getColorClass(), this.getSizeClass()].join(" ").trim();
  }

  render() {
    return (
      <IconContainer className={this.getClasses()}>
        <use xlinkHref={this.getIconUrl()} />
      </IconContainer>
    );
  }
}
