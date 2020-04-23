import { mount, ReactWrapper, ShallowWrapper, shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Button } from "./button";

describe("Button", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      act(() => {
        wrapper = mount(<Button />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render a button element", () => {
      expect(wrapper.find("button").length).toEqual(1);
    });
  });

  describe("getTypeClass", () => {
    let wrapper: ShallowWrapper;
    let result: string;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Button />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return an empty string when no type is given", () => {
      result = (wrapper.instance() as Button).getTypeClass();
      expect(result).toEqual("");
    });
    it("should return the class for primary when the type is primary", () => {
      wrapper.setProps({ type: "primary" });
      result = (wrapper.instance() as Button).getTypeClass();
      expect(result).toEqual("button--primary");
    });
    it("should return the class for secondary when the type is secondary", () => {
      wrapper.setProps({ type: "secondary" });
      result = (wrapper.instance() as Button).getTypeClass();
      expect(result).toEqual("button--secondary");
    });
    it("should return the class for danger when the type is danger", () => {
      wrapper.setProps({ type: "danger" });
      result = (wrapper.instance() as Button).getTypeClass();
      expect(result).toEqual("button--danger");
    });
  });

  describe("getSizeClass", () => {
    let wrapper: ShallowWrapper;
    let result: string;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Button />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return an empty string when no size is given", () => {
      result = (wrapper.instance() as Button).getSizeClass();
      expect(result).toEqual("");
    });
    it("should return the class for small when the size is small", () => {
      wrapper.setProps({ size: "small" });
      result = (wrapper.instance() as Button).getSizeClass();
      expect(result).toEqual("button--small");
    });
    it("should return the class for medium when the size is medium", () => {
      wrapper.setProps({ size: "medium" });
      result = (wrapper.instance() as Button).getSizeClass();
      expect(result).toEqual("button--medium");
    });
    it("should return the class for large when the size is large", () => {
      wrapper.setProps({ size: "large" });
      result = (wrapper.instance() as Button).getSizeClass();
      expect(result).toEqual("button--large");
    });
  });

  describe("getIconClass", () => {
    let wrapper: ShallowWrapper;
    let result: string;

    beforeEach(() => {
      act(() => {
        wrapper = shallow(<Button />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return an empty string when no icon is given", () => {
      result = (wrapper.instance() as Button).getIconClass();
      expect(result).toEqual("");
    });
    it("should return icon-text class when icon and text is given", () => {
      wrapper.setProps({ children: "test text", icon: "test-icon" });
      result = (wrapper.instance() as Button).getIconClass();
      expect(result).toEqual("button--icon-text");
    });
    it("should return icon class when icon is given with no text", () => {
      wrapper.setProps({ icon: "test-icon" });
      result = (wrapper.instance() as Button).getIconClass();
      expect(result).toEqual("button--icon");
    });
  });

  describe("getClasses", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      spyOn(Button.prototype, "getTypeClass").and.returnValue("test-type");
      spyOn(Button.prototype, "getSizeClass").and.returnValue("test-size");
      spyOn(Button.prototype, "getIconClass").and.returnValue("test-icon");
      act(() => {
        wrapper = shallow(<Button />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should return all applicable classes separated by a space", () => {
      const result = (wrapper.instance() as Button).getClasses();
      expect(result).toEqual("button test-type test-size test-icon");
    });
  });

  describe("render", () => {
    let wrapper: ReactWrapper;
    let onClickCallback: any;

    beforeEach(() => {
      onClickCallback = jest.fn();
      spyOn(Button.prototype, "getClasses").and.returnValue("test-class");
      act(() => {
        wrapper = mount(<Button onClick={onClickCallback} />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should add the button class names to the root element", () => {
      expect(
        wrapper.getDOMNode().classList.contains("test-class")
      ).toBeTruthy();
    });
    it("should set disabled to true if prop disabled exists", () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.first().prop("disabled")).toBeTruthy();
    });
    it("should render the given text as within the text span", () => {
      wrapper.setProps({ children: "test-text" });
      expect(wrapper.find(".button__text").first().text()).toBe("test-text");
    });
    it("should call the given onClick function on button click", () => {
      wrapper.simulate("click")
      expect(onClickCallback).toHaveBeenCalled();
    });
    it("should not call the given onChange function when there is no onChange function", () => {
      wrapper.setProps({ onClick: null });
      wrapper.simulate("click")
      expect(onClickCallback).not.toHaveBeenCalled();
    });

    describe("with icon passed to props", () => {
      beforeEach(() => {
        wrapper.setProps({ icon: "test-icon" });
      });

      it("should render an icon element", () => {
        expect(
          wrapper.childAt(0).children().childAt(0).is("Icon")
        ).toBeTruthy();
      });
      it("should pass the icon name to the icon element", () => {
        expect(wrapper.childAt(0).children().childAt(0).props().name).toEqual(
          "test-icon"
        );
      });
      it("should pass the icon color to the icon element", () => {
        wrapper.setProps({ iconColor: "test-color" });
        expect(wrapper.childAt(0).children().childAt(0).props().color).toEqual(
          "test-color"
        );
      });
    });
  });
});
