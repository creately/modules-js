import styled from "styled-components";

const defaultTheme = {
  primaryColor: "#5b5b5b",
  primaryFontFamily: "Arial, Helvetica, sans-serif",
  baseFontSize: "15px",
  globalBorderRadius: "4px",
  tooltip: {
    backgroundColor: "grey",
    fontColor: "white",
    fontSize: "14px",
    zIndex: 10,
  },
};

const TooltipContainer = styled.div`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.tooltip.fontSize};
  max-width: 250px;
  background-color: ${(props) => props.theme.tooltip.backgroundColor};
  color: ${(props) => props.theme.tooltip.fontColor};
  border-radius: ${(props) => props.theme.globalBorderRadius};
  z-index: ${(props) => props.theme.tooltip.zIndex};
  position: fixed;
  padding: 8px;
  display: none;

  .tooltip__title,
  .tooltip__description {
    display: block;
  }

  .tooltip__description {
    margin-top: 5px;
  }

  .tooltip__arrow {
    width: 0;
    height: 0;
    position: absolute;
  }

  &.tooltip--top {
    bottom: 100%;
    margin-bottom: 5px;

    .tooltip__arrow {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-top: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }

  &.tooltip--bottom {
    margin-top: 5px;

    .tooltip__arrow {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }

  &.tooltip--left {
    margin-right: 5px;

    .tooltip__arrow {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }

  &.tooltip--right {
    margin-left: 5px;
    transform: translateY(-50%);

    .tooltip__arrow {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-right: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
`;

TooltipContainer.defaultProps = {
  theme: defaultTheme,
};

export { TooltipContainer };
