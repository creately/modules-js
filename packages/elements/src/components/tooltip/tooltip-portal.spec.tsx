import { ReactWrapper, mount } from "enzyme";
import React from "react";
import { TooltipPortal } from "./tooltip-portal";
import { act } from "react-dom/test-utils";

describe("TooltipPortal", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;
    let instance: any;

    beforeEach(() => {
      act(() => {
        wrapper = mount(<TooltipPortal />);
        instance = wrapper.instance() as TooltipPortal;
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should create a div element for element", () => {
      expect(instance.element.tagName).toBe("DIV");
    });

    it("should add the default class to the element", () => {
      expect(
        instance.element.classList.contains("tooltip-portal")
      ).toBeTruthy();
    });
  });

  // TODO: componentDidMount
  // TODO: componentWillUnmount
  // TODO: render
});
