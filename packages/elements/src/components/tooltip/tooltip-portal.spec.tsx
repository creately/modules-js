import { ReactWrapper, mount } from "enzyme";
import React from "react";
import { TooltipPortal } from "./tooltip-portal";
import { act } from "react-dom/test-utils";

describe("TooltipPortal", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render a div element", () => {
      act(() => {
        wrapper = mount(<TooltipPortal />);
      });
      expect(document.getElementsByClassName("tooltip-portal").length).toEqual(
        1
      );
    });
  });
});
