import React, { RefObject } from "react";
import { TooltipTrigger, TooltipContainer } from "./tooltip.styles";
import { TooltipPortal } from "./tooltip-portal";

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
  /**
   * The gap to maintain between the tooltip, screen edges and the target element, in pixels.
   */
  private gap: number = 8;

  /**
   * The target element to attach the tooltip to.
   */
  private targetElement: RefObject<HTMLSpanElement>;

  /**
   * The tooltip element.
   */
  private tooltipElement: RefObject<HTMLDivElement>;

  /**
   * Available tooltip positions.
   */
  private availablePositions = ["top", "bottom", "left", "right"];

  /**
   * Default position to show tooltip in.
   */
  private defaultPosition = "bottom";

  /**
   * Default class for tooltip.
   */
  private defaultClass: string = "tooltip";

  constructor(props: TooltipProps) {
    super(props);
    this.targetElement = React.createRef<HTMLSpanElement>();
    this.tooltipElement = React.createRef<HTMLDivElement>();
    this.state = {
      visible: false,
      style: {},
    };
  }

  /**
   * Shows the tooltip.
   */
  showTooltip() {
    this.setState({ visible: true });
  }

  /**
   * Hides the tooltip.
   */
  hideTooltip() {
    this.setState({ visible: false });
  }

  /**
   * Returns a string of applicable position classes.
   */
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

  /**
   * Returns a string of all applicable classes.
   */
  getClasses(): string {
    return [this.defaultClass, this.getPositionClass()].join(" ").trim();
  }

  /**
   * Listen to window scroll and resize events and update tooltip position.
   */
  componentDidMount(): void {
    window.addEventListener("scroll", this.handleWindowChange);
    window.addEventListener("resize", this.handleWindowChange);
  }

  /**
   * Wait for the tooltip to be added to the DOM and update it's position,
   * and then display it.
   */
  componentDidUpdate(): void {
    this.updateTooltipPosition();
    this.displayTooltip();
  }

  /**
   * Stop listening to window scroll and resize events.
   */
  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.handleWindowChange);
    window.removeEventListener("resize", this.handleWindowChange);
  }

  /**
   * Update the position of the tooltip on the screen based on the current
   * position prop, tooltip dimensions and the position and dimensions
   * of the target element.
   */
  updateTooltipPosition(): void {
    if (!!!this.targetElement.current || !!!this.tooltipElement.current) {
      return;
    }

    const targetDimensions = this.targetElement.current?.getBoundingClientRect();
    const tooltipDimensions = this.tooltipElement.current?.getBoundingClientRect();

    // Style is being set directly on the element as setting it via state
    // would trigger another update cycle causing a loop.
    this.tooltipElement.current.style.left = this.getLeft(
      targetDimensions.left,
      targetDimensions.width,
      tooltipDimensions.width
    );

    this.tooltipElement.current.style.top = this.getTop(
      targetDimensions.top,
      targetDimensions.height,
      tooltipDimensions.height
    );
  }

  /**
   * Set the tooltip visibility to visible.
   */
  displayTooltip(): void {
    if (!!!this.tooltipElement.current) {
      return;
    }
    this.tooltipElement.current.style.visibility = "visible";
  }

  /**
   * Returns the left value in pixels for the tooltip based on the
   * current position prop.
   * @param targetLeft the left offset for the target element
   * @param targetWidth the width of the target element
   * @param tooltipWidth the width of the tooltip
   */
  getLeft(
    targetLeft: number,
    targetWidth: number,
    tooltipWidth: number
  ): string {
    let left: number = 0;

    switch (this.props.position) {
      case "right":
        left = targetLeft + targetWidth + this.gap;
        break;

      case "left":
        left = targetLeft - tooltipWidth - this.gap * 2;
        break;

      case "top":
      case "bottom":
      default:
        left = targetLeft + targetWidth / 2 - tooltipWidth / 2;
        left = Math.max(this.gap, left);
        left = Math.min(
          left,
          document.body.clientWidth - tooltipWidth + this.gap
        );
        break;
    }

    return left + "px";
  }

  /**
   * Returns the top value in pixels for the tooltip based on the
   * current position prop.
   * @param targetTop the top offset for the target element
   * @param targetHeight the height of the target element
   * @param tooltipHeight the height of the tooltip
   */
  getTop(
    targetTop: number,
    targetHeight: number,
    tooltipHeight: number
  ): string {
    let top: number = 0;

    switch (this.props.position) {
      case "top":
        top = targetTop - tooltipHeight - this.gap;
        break;

      case "right":
      case "left":
        top = targetTop + targetHeight / 2 - tooltipHeight / 2;
        break;

      case "bottom":
      default:
        top = targetTop + targetHeight + this.gap;
        break;
    }

    return top + "px";
  }

  handleWindowChange = (): void => {
    this.updateTooltipPosition();
  };

  render() {
    return (
      <TooltipTrigger
        onMouseOver={() => this.showTooltip()}
        onMouseOut={() => this.hideTooltip()}
        className="tooltip__trigger"
        ref={this.targetElement}
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
      </TooltipTrigger>
    );
  }
}
