import { ReactWrapper, mount, ShallowWrapper, shallow } from "enzyme";
import React from "react";
import { RadioButton } from "./radio-button";
import { act } from "react-dom/test-utils";
import { mountWithTheme } from "../../test-helpers";

describe("RadioButton", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render a radio button element", () => {
      act(() => {
        wrapper = mount(<RadioButton name="test" value="test_1" />);
      });
      expect(wrapper.find("input").length).toEqual(1);
    });
    it("should set checked state to true when checked prop is true", () => {
      act(() => {
        wrapper = mount(<RadioButton name="test" value="test_1" checked />);
      });
      expect(wrapper.state("checked")).toBeTruthy();
    });
  });

  describe("toggle", () => {
    let wrapper: ShallowWrapper;
    let onChangeCallback: any;
    let instance: RadioButton;
    let setStateSpy: jasmine.Spy;

    beforeEach(() => {
      onChangeCallback = jest.fn();
      setStateSpy = spyOn(RadioButton.prototype, "setState");
      act(() => {
        wrapper = shallow(
          <RadioButton
            name="test"
            value="test_1"
            checked={true}
            onChange={onChangeCallback}
          />
        );
      });
      instance = wrapper.instance() as RadioButton;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should invert the state of checked", (done) => {
      instance.toggle();
      expect(setStateSpy).toHaveBeenCalled();
      setTimeout(() => {
        try {
          expect(instance.state.checked).toEqual(true);
          done();
        } catch (error) {
          done(error);
        }
      }, 0);
    });
    it("should call the given onChange function with the radio button value", () => {
      instance.toggle();
      expect(onChangeCallback).toHaveBeenCalledWith("test_1");
    });
    it("should not call the given onChange function when there is no onChange function", () => {
      wrapper.setProps({ onChange: null });
      instance.toggle();
      expect(onChangeCallback).not.toHaveBeenCalled();
    });
  });

  describe("render", () => {
    let wrapper: ShallowWrapper;
    let toggleSpy: jasmine.Spy;

    beforeEach(() => {
      toggleSpy = spyOn(RadioButton.prototype, "toggle");
      act(() => {
        wrapper = shallow(
          <RadioButton name="test" value="test_1"></RadioButton>
        );
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should set given name as name", () => {
      expect(wrapper.find(".radio-button__input").prop("name")).toBe("test");
    });
    it("should set given value as value", () => {
      expect(wrapper.find(".radio-button__input").prop("value")).toBe("test_1");
    });
    it("should set given children as title", () => {
      wrapper.setProps({ children: "Test title" });
      expect(wrapper.find(".radio-button__title").text()).toBe("Test title");
    });
    it("should set given description as description", () => {
      wrapper.setProps({ description: "Test description" });
      expect(wrapper.find(".radio-button__description").text()).toBe(
        "Test description"
      );
    });
    it("should set given checked value as checked value", () => {
      wrapper.setState({ checked: true });
      expect(wrapper.find(".radio-button__input").prop("checked")).toBeTruthy();
    });
    it("should not set disabled if disabled is false", () => {
      wrapper.setProps({ disabled: null });
      expect(wrapper.find(".radio-button__input").prop("disabled")).toBeFalsy();
    });
    it("should set disabled if disabled is true", () => {
      wrapper.setProps({ disabled: true });
      expect(
        wrapper.find(".radio-button__input").prop("disabled")
      ).toBeTruthy();
    });
    it("should call the toggle when an onChange event occurs", () => {
      wrapper.find(".radio-button__input").simulate("change");
      expect(toggleSpy).toHaveBeenCalled();
    });
  });

  describe("with theme", () => {
    let wrapper: ReactWrapper;

    it("should set style rule for font size", () => {
      const testTheme = {
        baseFontSize: "12px",
        radioButton: {},
      };
      act(() => {
        wrapper = mountWithTheme(
          <RadioButton name="test" value="test_1" />,
          testTheme
        );
      });
      expect(wrapper).toHaveStyleRule("font-size", "12px");
    });
  });
});
