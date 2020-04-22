import { ReactWrapper, mount, ShallowWrapper, shallow } from "enzyme";
import React from "react";
import { mountWithTheme } from "../../test-helpers";
import { Checkbox } from "./checkbox";
import { act } from "react-dom/test-utils";

describe("Checkbox", () => {
  describe("constructor", () => {
    let wrapper: ReactWrapper;
    let checkboxToggleSpy: jasmine.Spy;

    beforeEach(() => {
      checkboxToggleSpy = spyOn(Checkbox.prototype, "checkboxToggle");
      act(() => {
        wrapper = mount(<Checkbox value="" />);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render a checkbox element", () => {
      expect(wrapper.find("input").length).toEqual(1);
    });
    it("should set checked to true when checked value is true", () => {
      wrapper.setState({ checked: true });
      expect(wrapper.find("input").first().props().checked).toEqual(true);
    });
    it("should call checkboxToggle when checkbox is clicked", () => {
      wrapper.find("input").simulate("change");
      expect(checkboxToggleSpy).toHaveBeenCalled();
    });
  });

  describe("checkboxToggle", () => {
    let wrapper: ShallowWrapper;
    let onChangeCallback: any;
    let instance: Checkbox;
    let setStateSpy: jasmine.Spy;

    beforeEach(() => {
      onChangeCallback = jest.fn();
      setStateSpy = spyOn(Checkbox.prototype, "setState");
      act(() => {
        wrapper = shallow(
          <Checkbox value="" checked={true} onChange={onChangeCallback} />
        );
      });
      instance = wrapper.instance() as Checkbox;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should invert the state of checked", (done) => {
      instance.checkboxToggle();
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
    it("should call the given onChange function", () => {
      instance.checkboxToggle();
      expect(onChangeCallback).toHaveBeenCalled();
    });
  });

  describe("with theme", () => {
    let wrapper: ReactWrapper;

    it("should set style rule for font size", () => {
      const testTheme = {
        baseFontSize: "12px",
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
