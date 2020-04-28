import { ShallowWrapper, shallow } from "enzyme";
import React from "react";
import { Tooltip } from "./tooltip";
import { act } from "react-dom/test-utils";

describe("Tooltip", () => {
  describe("constructor", () => {
    let wrapper: ShallowWrapper;
    let instance: any;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Tooltip />);
        instance = wrapper.instance() as Tooltip;
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should initialize refs", () => {
      expect(instance.targetElement).toEqual({ current: null });
      expect(instance.tooltipElement).toEqual({ current: null });
    });

    it("should set initial state", () => {
      const initialState = {
        show: false,
        left: "auto",
        top: "auto",
        visibility: "hidden",
      };
      expect(wrapper.state()).toEqual(initialState);
    });
  });

  // TODO: showTooltip
  // TODO: hideTooltip
  // TODO: getPositionClass
  // TODO: getClasses
  // TODO: componentDidMount
  // TODO: componentDidUpdate
  // TODO: componentWillUnmount
  // TODO: updateTooltipPosition
  // TODO: displayTooltip
  // TODO: getLeft
  // TODO: getTop
  // TODO: handleWindowChange
  // TODO: render
});
