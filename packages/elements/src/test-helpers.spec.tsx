import React from "react";
import { mountWithTheme } from "./test-helpers";
import styled from "styled-components";

const ButtonContainer = styled.div`
  color: ${(props) => props.theme.color};
`;

ButtonContainer.defaultProps = {
  theme: {
    color: "black",
  },
};

class Button extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <ButtonContainer></ButtonContainer>;
  }
}

describe("mountWithTheme", () => {
  const testTheme = {
    color: "green",
  };

  it("should apply a given theme to a given element", () => {
    const button = mountWithTheme(<Button />, testTheme);
    expect(button).toHaveStyleRule("color", "green");
  });
});
