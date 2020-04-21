import React from "react";
import styled from "styled-components";
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

const IconContainer = styled.svg`
  display: inline-block;
  width: 25px;
  height: 25px;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  color: inherit;

  &.icon-xsmall {
    width: 15px;
    height: 15px;
  }

  &.icon-small {
    width: 20px;
    height: 20px;
  }

  &.icon-medium {
    width: 25px;
    height: 25px;
  }

  &.icon-large {
    width: 45px;
    height: 45px;
  }

  &.icon-white {
    color: white;
  }

  &.icon-black {
    color: black;
  }
`;

/**
 * Icons can be used within any component.
 * They render an inline svg, inherit color from their parent components,
 * and have no interactions with themes.
 */
export class Icon extends React.Component<IconProps> {
  constructor(props: IconProps) {
    super(props);
  }

  getIconUrl(): string {
    return `${icons as string}#nu-ic-${this.props.name}`;
  }

  getColorClass(): string {
    switch (this.props.color) {
      case "black":
      case "white":
        return this.props.color;
      default:
        return "";
    }
  };

  getSizeClass(): string {
    switch (this.props.size) {
      case "xsmall":
      case "small":
      case "medium":
      case "large":
        return `icon icon-${this.props.size}`;
      default:
        return "icon";
    }
  }

  getClasses(): string {
    return [
      this.getColorClass(),
      this.getSizeClass(),
    ].join(" ").trim();
  }

  render() {
    return (
      <IconContainer className={this.getClasses()}>
        <use xlinkHref={this.getIconUrl()} />
      </IconContainer>
    );
  }
}
