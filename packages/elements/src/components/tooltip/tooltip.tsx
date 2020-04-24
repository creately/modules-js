import React, { RefObject } from "react";
import ReactDOM from "react-dom";
import { TooltipContainer } from "./tooltip.styles";

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
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
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
    console.log("componentDidUpdate");
    this.updateTooltipPositionAndShow();
  }

  updateTooltipPositionAndShow(): void {
    if (!!!this.targetElement || !!!this.tooltipElement.current) {
      return;
    }

    const targetDimensions = this.targetElement.getBoundingClientRect();
    const tooltipDimensions = this.tooltipElement.current?.getBoundingClientRect();

    let left = 0;
    let top = 0;
    let bottom = 0;

    switch (this.props.position) {
      case "top":
        bottom = window.innerHeight - targetDimensions.top + this.gap;
        this.tooltipElement.current.style.bottom = bottom + "px";

        left =
          targetDimensions.left +
          targetDimensions.width / 2 -
          tooltipDimensions.width / 2;
        left = Math.max(this.gap, left);
        left = Math.min(
          left,
          document.body.clientWidth - tooltipDimensions.width - this.gap
        );
        this.tooltipElement.current.style.left = left + "px";

        this.tooltipElement.current.style.visibility = "visible";
        break;

      case "bottom":
        top = targetDimensions.top + targetDimensions.height + this.gap;
        this.tooltipElement.current.style.top = top + "px";

        left =
          targetDimensions.left +
          targetDimensions.width / 2 -
          tooltipDimensions.width / 2;
        left = Math.max(this.gap, left);
        left = Math.min(
          left,
          document.body.clientWidth - tooltipDimensions.width - this.gap
        );
        this.tooltipElement.current.style.left = left + "px";

        this.tooltipElement.current.style.visibility = "visible";
        break;

      case "right":
        top =
          targetDimensions.top +
          targetDimensions.height / 2 -
          tooltipDimensions.height / 2;
        this.tooltipElement.current.style.top = top + "px";

        left = targetDimensions.left + targetDimensions.width + this.gap;
        this.tooltipElement.current.style.left = left + "px";

        this.tooltipElement.current.style.visibility = "visible";
        break;

      case "left":
        top =
          targetDimensions.top +
          targetDimensions.height / 2 -
          tooltipDimensions.height / 2;
        this.tooltipElement.current.style.top = top + "px";

        left = targetDimensions.left - tooltipDimensions.width - this.gap * 2;
        this.tooltipElement.current.style.left = left + "px";

        this.tooltipElement.current.style.visibility = "visible";
        break;

      default:
        top = targetDimensions.top + targetDimensions.height + this.gap;
        this.tooltipElement.current.style.top = top + "px";

        left =
          targetDimensions.left +
          targetDimensions.width / 2 -
          tooltipDimensions.width / 2;
        left = Math.max(this.gap, left);
        left = Math.min(
          left,
          document.body.clientWidth - tooltipDimensions.width - this.gap
        );
        this.tooltipElement.current.style.left = left + "px";

        this.tooltipElement.current.style.visibility = "visible";
        break;
    }
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
