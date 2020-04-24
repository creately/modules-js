import React, { RefObject } from "react";
import ReactDOM from "react-dom";
import { TooltipContainer } from "./tooltip.styles";
import { CSSProperties } from "styled-components";

export class TooltipPortal extends React.PureComponent {
  private el: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.el = document.createElement("div");
    this.el.classList.add("tooltip-portal");
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

/**
 * Tooltip props.
 */
export interface TooltipProps {
  title: string;
  description?: string;
  position?: string;
  children: any;
}

/**
 * Tooltip state.
 */
export interface TooltipState {
  visible: boolean;
  style: CSSProperties;
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
  private width: number;
  private gap: number;
  private targetElement: HTMLSpanElement | null;
  private tooltipElement: RefObject<HTMLDivElement>;

  private availablePositions = ["top", "bottom", "left", "right"];
  private defaultPosition = "bottom";
  private defaultClass: string = "tooltip";

  constructor(props: TooltipProps) {
    super(props);
    this.targetElement = null;
    this.tooltipElement = React.createRef<HTMLDivElement>();

    this.state = {
      visible: false,
      style: {
        width: 256,
        height: undefined,
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
      },
    };

    this.width = 256;
    this.gap = 8;
  }

  showTooltip() {
    if (!!!this.targetElement) {
      return;
    }

    let tooltipPosition: CSSProperties = {
      width: 250,
      height: undefined,
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    };

    tooltipPosition.width = this.width;

    const targetDimensions = this.targetElement.getBoundingClientRect();

    switch (this.props.position) {
      case "top":
        tooltipPosition.bottom =
          window.innerHeight - targetDimensions.top + this.gap;
        tooltipPosition.left =
          targetDimensions.left + targetDimensions.width / 2 - this.width / 2;
        tooltipPosition.left = Math.max(this.gap, tooltipPosition.left);
        tooltipPosition.left = Math.min(
          tooltipPosition.left,
          document.body.clientWidth - this.width - this.gap
        );
        break;

      case "bottom":
        tooltipPosition.top =
          targetDimensions.top + targetDimensions.height + this.gap;
        tooltipPosition.left =
          targetDimensions.left + targetDimensions.width / 2 - this.width / 2;
        tooltipPosition.left = Math.max(this.gap, tooltipPosition.left);
        tooltipPosition.left = Math.min(
          tooltipPosition.left,
          document.body.clientWidth - this.width - this.gap
        );
        break;

      case "right":
        tooltipPosition.top =
          targetDimensions.top + targetDimensions.height / 2;
        tooltipPosition.left =
          targetDimensions.left + targetDimensions.width + this.gap;
        break;

      case "left":
        tooltipPosition.top =
          targetDimensions.top - targetDimensions.height / 2;
        tooltipPosition.left =
          targetDimensions.left - this.width - this.gap * 2;
        break;

      default:
        tooltipPosition.bottom =
          window.innerHeight - targetDimensions.top + this.gap;
        break;
    }

    this.setState({
      visible: true,
      style: tooltipPosition,
    });
  }

  hideTooltip() {
    this.setState({ visible: false });
  }

  getPositionClass(): string {
    if (
      this.props.position &&
      this.availablePositions.includes(this.props.position)
    ) {
      return `tooltip--${this.props.position}`;
    } else {
      return `tooltip--${this.defaultPosition}`;
    }
  }

  getClasses(): string {
    return [this.defaultClass, this.getPositionClass()].join(" ").trim();
  }

  componentDidUpdate() {
    console.log(this.tooltipElement);
    const tooltipDimensions = this.tooltipElement.current?.getBoundingClientRect();
    console.log(tooltipDimensions);
  }

  render() {
    return (
      <span
        onMouseOver={() => this.showTooltip()}
        // onMouseOut={() => this.hideTooltip()}
        className="tooltip__trigger"
        ref={(element) => (this.targetElement = element)}
      >
        {this.props.children}

        {this.state.visible && (
          <TooltipPortal>
            <TooltipContainer
              className={this.getClasses()}
              style={this.state.style}
              ref={this.tooltipElement}
            >
              <span className="tooltip__title">{this.props.title}</span>
              {this.props.description && (
                <span className="tooltip__description">
                  {this.props.description}
                </span>
              )}
              <span className="tooltip__arrow"></span>
            </TooltipContainer>
          </TooltipPortal>
        )}
      </span>
    );
  }
}
