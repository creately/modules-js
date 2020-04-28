import React from "react";
import ReactDOM from "react-dom";

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

  /**
   * The default class for the tooltip portal.
   */
  private defaultClass: string = "tooltip-portal";

  constructor(props: any) {
    super(props);
    this.element = document.createElement("div");
    this.element.classList.add(this.defaultClass);
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
