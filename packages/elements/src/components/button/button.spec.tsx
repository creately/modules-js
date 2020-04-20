import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Button } from "./button";

describe("Button", () => {
  let button: ShallowWrapper;

  describe("constructor", () => {
    it("should render a button element", () => {
      act(() => {
        button = shallow(<Button />);
      });
      expect(button.find("button").length).toEqual(1);
    });
  });
});
