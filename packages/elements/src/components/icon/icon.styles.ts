import styled from "styled-components";

const IconContainer = styled.svg`
  display: inline-block;
  width: 25px;
  height: 25px;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  color: inherit;

  &.icon--xsmall {
    width: 15px;
    height: 15px;
  }

  &.icon--small {
    width: 20px;
    height: 20px;
  }

  &.icon--medium {
    width: 25px;
    height: 25px;
  }

  &.icon--large {
    width: 45px;
    height: 45px;
  }

  &.icon--white {
    color: white;
  }

  &.icon--black {
    color: black;
  }
`;

export { IconContainer };
