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
}

const IconContainer = styled.svg`
  display: inline-block;
  width: 30px;
  height: 30px;
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

  getClasses(): string {
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

  render() {
    return (
      <IconContainer className={this.getClasses()}>
        <use xlinkHref={this.getIconUrl()} />
      </IconContainer>
    );
  }
}
