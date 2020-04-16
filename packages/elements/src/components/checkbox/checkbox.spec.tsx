import React from "react";
import { act } from "react-dom/test-utils";
import { configure, shallow, ShallowWrapper } from "enzyme";
import { Checkbox } from "./checkbox";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

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
});
