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

  describe("getColorClass", () => {
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

    it("should return empty string class when no color is given", () => {
      result = (wrapper.instance() as Icon).getColorClass();
      expect(result).toEqual("");
    });
    it("should return the classes for white when the color is white", () => {
      wrapper.setProps({ color: "white" });
      result = (wrapper.instance() as Icon).getColorClass();
      expect(result).toEqual("icon--white");
    });
    it("should return the classes for small when the color is black", () => {
      wrapper.setProps({ color: "black" });
      result = (wrapper.instance() as Icon).getColorClass();
      expect(result).toEqual("icon--black");
    });
  });

  describe("getSizeClass", () => {
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

    it("should return an empty string when no size is given", () => {
      result = (wrapper.instance() as Icon).getSizeClass();
      expect(result).toEqual("");
    });
    it("should return the classes for xsmall when the size is xsmall", () => {
      wrapper.setProps({ size: "xsmall" });
      result = (wrapper.instance() as Icon).getSizeClass();
      expect(result).toEqual("icon--xsmall");
    });
    it("should return the classes for small when the size is small", () => {
      wrapper.setProps({ size: "small" });
      result = (wrapper.instance() as Icon).getSizeClass();
      expect(result).toEqual("icon--small");
    });
    it("should return the classes for medium when the size is medium", () => {
      wrapper.setProps({ size: "medium" });
      result = (wrapper.instance() as Icon).getSizeClass();
      expect(result).toEqual("icon--medium");
    });
    it("should return the classes for large when the size is large", () => {
      wrapper.setProps({ size: "large" });
      result = (wrapper.instance() as Icon).getSizeClass();
      expect(result).toEqual("icon--large");
    });
  });

  describe("getClasses", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      spyOn(Icon.prototype, "getColorClass").and.returnValue("test-color");
      spyOn(Icon.prototype, "getSizeClass").and.returnValue("test-size");
      act(() => {
        wrapper = shallow(<Icon name="tick" />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return all applicable classes separated by a space", () => {
      const result = (wrapper.instance() as Icon).getClasses();
      expect(result).toEqual("icon test-color test-size");
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
