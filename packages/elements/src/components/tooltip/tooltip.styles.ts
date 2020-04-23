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

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContainer = styled.div`
  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: ${(props) => props.theme.tooltip.fontSize};
  max-width: 250px;
  background-color: ${(props) => props.theme.tooltip.backgroundColor};
  color: ${(props) => props.theme.tooltip.fontColor};
  border-radius: ${(props) => props.theme.globalBorderRadius};
  position: absolute;
  z-index: ${(props) => props.theme.tooltip.zIndex};

  .tooltip__title,
  .tooltip__description {
    display: block;
    padding: 5px 8px;
  }

  .tooltip__arrow {
    width: 0;
    height: 0;
    position: absolute;
  }

  /* @else if ($point-direction == 'up') {
      border-bottom:  $border-size solid $border-color;
      border-left:    $border-size solid transparent;
      border-right:   $border-size solid transparent;
    }

    @else if ($point-direction == 'left') {
      border-right:   $border-size solid $border-color;
      border-top:     $border-size solid transparent;
      border-bottom:  $border-size solid transparent;
    }

    @else if ($point-direction == 'right') {
      border-left:    $border-size solid $border-color;
      border-top:     $border-size solid transparent;
      border-bottom:  $border-size solid transparent;
    } */

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
    top: 0;
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
    top: -50%;
    margin-left: 5px;
    left: 100%;

    .tooltip__arrow {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-right: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }

  &.tooltip--right {
    top: -50%;
    margin-right: 5px;
    right: 100%;

    .tooltip__arrow {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 5px solid ${(props) => props.theme.tooltip.backgroundColor};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
`;

TooltipWrapper.defaultProps = {
  theme: defaultTheme,
};

TooltipContainer.defaultProps = {
  theme: defaultTheme,
};

export { TooltipWrapper, TooltipContainer };
