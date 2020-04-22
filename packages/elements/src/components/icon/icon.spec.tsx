import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Icon } from "./icon";

describe("Icon", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      act(() => {
        wrapper = mount(<Icon name="tick" />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render an svg element at root", () => {
      expect(wrapper.getDOMNode().tagName).toBe("svg");
    });
    it("should render a use element as first child", () => {
      expect(wrapper.find("use").length).toEqual(1);
    });
  });

  describe("getIconUrl", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Icon name="tick" />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return the url path for the given icon", () => {
      const result = (wrapper.instance() as Icon).getIconUrl();
      expect(result).toEqual("#nu-ic-tick");
    });
  });

  describe("getClasses", () => {
    let wrapper: ShallowWrapper;
    let result: string;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Icon name="tick" />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return default class when no size is given", () => {
      result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon");
    });
    it("should return the classes for xsmall when the size is xsmall", () => {
      wrapper.setProps({ size: "xsmall" });
      result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon icon-xsmall");
    });
    it("should return the classes for small when the size is small", () => {
      wrapper.setProps({ size: "small" });
      result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon icon-small");
    });
    it("should return the classes for medium when the size is medium", () => {
      wrapper.setProps({ size: "medium" });
      result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon icon-medium");
    });
    it("should return the classes for large when the size is large", () => {
      wrapper.setProps({ size: "large" });
      result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon icon-large");
    });
  });

  describe("render", () => {
    it("should add the icon class names to the root element", () => {
      spyOn(Icon.prototype, "getClasses").and.returnValue("test-class");
      let wrapper: ShallowWrapper;
      wrapper = shallow(<Icon name="tick" />);
      expect(wrapper.hasClass("test-class")).toBeTruthy();
    });

    it("should set the icon url to the use element's xlink:href attribute", () => {
      spyOn(Icon.prototype, "getIconUrl").and.returnValue("test-icon-url");
      const wrapper = mount(<Icon name="tick" />);
      expect(wrapper.find("use").prop("xlinkHref")).toBe("test-icon-url");
    });
  });
});
