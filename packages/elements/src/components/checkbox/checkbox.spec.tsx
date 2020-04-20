import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, ShallowWrapper } from "enzyme";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  let checkbox: ShallowWrapper;

  describe("constructor", () => {
    it("should render a checkbox element", () => {
      act(() => {
        checkbox = shallow(<Checkbox value="" />);
      });
      expect(checkbox.find("input").length).toEqual(1);
    });

    it("should set checked to true when checked value is true", () => {
      act(() => {
        checkbox = shallow(<Checkbox value="" checked={true} />);
      });
      expect(checkbox.find("input").first().props().checked).toEqual(true);
    });

    it("should call checkboxToggle when checkbox is clicked", () => {
      act(() => {
        checkbox = shallow(<Checkbox value="" />);
      });
      const instance = checkbox.instance();
      const spy = jest.spyOn(instance as Checkbox, "checkboxToggle");
      instance.forceUpdate();
      checkbox.find("input").simulate("change");
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("checkboxToggle", () => {
    let checkbox: ShallowWrapper;
    let onChangeCallback: any;
    let instance: Checkbox;

    beforeEach(() => {
      onChangeCallback = jest.fn();
  
      act(() => {
        checkbox = shallow(<Checkbox value="" checked={ true } onChange={ onChangeCallback } />);
      });

      instance = checkbox.instance() as Checkbox;
    });

    it("should invert the state of checked", done => {
      const spy = spyOn( instance, 'setState' );
      instance.forceUpdate();
      instance.checkboxToggle();
      expect(spy).toHaveBeenCalled();
      setTimeout(() => {
        try {
          expect(instance.state.checked).toEqual( true );
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
});
