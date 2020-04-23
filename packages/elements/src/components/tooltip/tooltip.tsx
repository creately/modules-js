import React, { useState } from "react";
import { TooltipWrapper, TooltipContainer } from "./tooltip.styles";

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
export interface TooltipState {}

/**
 * Tooltips can be used within any component.
 */
const Tooltip = (props: TooltipProps) => {
  const availablePositions = ["top", "bottom", "left", "right"];
  const defaultPosition = "bottom";

  const defaultClass: string = "tooltip";

  const [isVisible, setVisible] = useState(true);

  function getPositionClass(): string {
    if (props.position && availablePositions.includes(props.position)) {
      return `tooltip--${props.position}`;
    } else {
      return `tooltip--${defaultPosition}`;
    }
  }

  function getClasses(): string {
    return [defaultClass, getPositionClass()].join(" ").trim();
  }

  return (
    <TooltipWrapper
      className="tooltip__wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {props.children}
      {isVisible && (
        <TooltipContainer className={getClasses()}>
          <div className="tooltip__title">{props.title}</div>
          {props.description && (
            <div className="tooltip__description">{props.description}</div>
          )}
          <span className="tooltip__arrow"></span>
        </TooltipContainer>
      )}
    </TooltipWrapper>
  );
};

export { Tooltip };
