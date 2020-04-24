import React, { RefObject } from "react";
import ReactDOM from "react-dom";
import { TooltipContainer } from "./tooltip.styles";

/**
 * A component that creates a tooltip portal container within which
 * tooltip components can be rendered. The tooltip portal is appended and removed
 * to/from the bottom of the document as needed.
 */
export class TooltipPortal extends React.PureComponent {

  /**
   * The element to append to the document.
   */
  private element: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.element = document.createElement("div");
    this.element.classList.add("tooltip-portal");
  }

  componentDidMount(): void {
    document.body.appendChild(this.element);
  }

  componentWillUnmount(): void {
    document.body.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

/**
 * Tooltip props.
 */
export interface TooltipProps {
  /**
   * The title for the tooltip.
   */
  title?: string;

  /**
   * The description for the tooltip.
   */
  description?: string;

  /**
   * The tooltip position, which can be to the top, bottom, left or right
   * of the target element.
   */
  position?: string;
}

/**
 * Tooltip state.
 */
export interface TooltipState {
  visible: boolean;
}

export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
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
    };

    this.gap = 8;
  }

  showTooltip() {
    this.setState({
      visible: true,
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

  componentDidUpdate(): void {
    this.updateTooltipPosition();
    this.displayTooltip();
  }

  displayTooltip(): void {
    if (!!!this.tooltipElement.current) {
      return;
    }
    this.tooltipElement.current.style.visibility = "visible";
  }

  updateTooltipPosition(): void {
    if (!!!this.targetElement || !!!this.tooltipElement.current) {
      return;
    }

    const targetDimensions = this.targetElement.getBoundingClientRect();
    const tooltipDimensions = this.tooltipElement.current?.getBoundingClientRect();

    switch (this.props.position) {
      case "top":
        this.tooltipElement.current.style.bottom =
          window.innerHeight - targetDimensions.top + this.gap + "px";
        this.tooltipElement.current.style.left = this.getVerticalLeft(
          targetDimensions.left,
          targetDimensions.width,
          tooltipDimensions.width
        );
        break;

      case "right":
        this.tooltipElement.current.style.top = this.getHorizontalTop(
          targetDimensions.top,
          targetDimensions.height,
          tooltipDimensions.height
        );
        this.tooltipElement.current.style.left =
          targetDimensions.left + targetDimensions.width + this.gap + "px";
        break;

      case "left":
        this.tooltipElement.current.style.top = this.getHorizontalTop(
          targetDimensions.top,
          targetDimensions.height,
          tooltipDimensions.height
        );
        this.tooltipElement.current.style.left =
          targetDimensions.left - tooltipDimensions.width - this.gap * 2 + "px";
        break;

      case "bottom":
      default:
        this.tooltipElement.current.style.top =
          targetDimensions.top + targetDimensions.height + this.gap + "px";
        this.tooltipElement.current.style.left = this.getVerticalLeft(
          targetDimensions.left,
          targetDimensions.width,
          tooltipDimensions.width
        );
        break;
    }
  }

  getVerticalLeft(
    targetLeft: number,
    targetWidth: number,
    tooltipWidth: number
  ): string {
    let left = targetLeft + targetWidth / 2 - tooltipWidth / 2;
    left = Math.max(this.gap, left);
    left = Math.min(left, document.body.clientWidth - tooltipWidth + this.gap);
    return left + "px";
  }

  getHorizontalTop(
    targetTop: number,
    targetHeight: number,
    tooltipHeight: number
  ): string {
    return targetTop + targetHeight / 2 - tooltipHeight / 2 + "px";
  }

  render() {
    return (
      <span
        onMouseOver={() => this.showTooltip()}
        onMouseOut={() => this.hideTooltip()}
        className="tooltip__trigger"
        ref={(element) => (this.targetElement = element)}
      >
        {this.props.children}
        {this.state.visible && (
          <TooltipPortal>
            <TooltipContainer
              className={this.getClasses()}
              ref={this.tooltipElement}
            >
              {this.props.title && (
                <span className="tooltip__title">{this.props.title}</span>
              )}
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
