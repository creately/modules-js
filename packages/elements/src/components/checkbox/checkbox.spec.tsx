import { ReactWrapper, mount, ShallowWrapper, shallow } from "enzyme";
import React from "react";
import { mountWithTheme } from "../../test-helpers";
import { Checkbox } from "./checkbox";
import { act } from "react-dom/test-utils";

describe("Checkbox", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render a checkbox element", () => {
      act(() => {
        wrapper = mount(<Checkbox value="" />);
      });
      expect(wrapper.find("input").length).toEqual(1);
    });
    it("should set checked to true when checked value is true", () => {
      act(() => {
        wrapper = mount(<Checkbox value="" checked/>);
      });
      expect(wrapper.state("checked")).toBeTruthy();
    });
  });

  describe("toggle", () => {
    let wrapper: ShallowWrapper;
    let onChangeCallback: any;
    let instance: Checkbox;
    let setStateSpy: jasmine.Spy;

    beforeEach(() => {
      onChangeCallback = jest.fn();
      setStateSpy = spyOn(Checkbox.prototype, "setState");
      act(() => {
        wrapper = shallow(
          <Checkbox value="test" checked={true} onChange={onChangeCallback} />
        );
      });
      instance = wrapper.instance() as Checkbox;
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
    it("should call the given onChange function with the checkbox value", () => {
      instance.toggle();
      expect(onChangeCallback).toHaveBeenCalledWith("test");
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
      toggleSpy = spyOn(Checkbox.prototype, "toggle");
      act(() => {
        wrapper = shallow(
          <Checkbox value="test"></Checkbox>
        );
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should set given value as value", () => {
      expect(wrapper.find(".checkbox__input").prop("value")).toBe("test");
    });
    it("should set given children as title", () => {
      wrapper.setProps({ children: "Test title" });
      expect(wrapper.find(".checkbox__title").text()).toBe("Test title");
    });
    it("should set given checked value as checked value", () => {
      wrapper.setState({ checked: true });
      expect(wrapper.find(".checkbox__input").prop("checked")).toBeTruthy();
    });
    it("should not set disabled if disabled is false", () => {
      wrapper.setProps({ disabled: null });
      expect(wrapper.find(".checkbox__input").prop("disabled")).toBeFalsy();
    });
    it("should set disabled if disabled is true", () => {
      wrapper.setProps({ disabled: true });
      expect(
        wrapper.find(".checkbox__input").prop("disabled")
      ).toBeTruthy();
    });
    it("should call the toggle when an onChange event occurs", () => {
      wrapper.find(".checkbox__input").simulate("change");
      expect(toggleSpy).toHaveBeenCalled();
    });
  });


  describe("with theme", () => {
    let wrapper: ReactWrapper;

    it("should set style rule for font size", () => {
      const testTheme = {
        baseFontSize: "12px",
        checkbox: {},
      };
      act(() => {
        wrapper = mountWithTheme(
          <Checkbox value="" checked={true} />,
          testTheme
        );
      });
      expect(wrapper).toHaveStyleRule("font-size", "12px");
    });
  });
});
