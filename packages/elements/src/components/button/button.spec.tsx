import React from "react";
import Renderer from "react-test-renderer";
import { Button } from "./button";

describe("Button", () => {
  it("should render a button element", () => {
    const renderer = Renderer.create(<Button />);
    expect(renderer.root.findAllByType("button").length).toEqual(1);
  });
});
