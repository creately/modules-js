import React from "react";
import { act } from 'react-dom/test-utils';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Checkbox } from "./checkbox";

configure({ adapter: new Adapter() });

describe("Checkbox", () => {
  let checkbox: ShallowWrapper;

  describe("constructor", () => {
    it("should render a checkbox element", () => {
      act(() => {
        checkbox = shallow(<Checkbox value="" />);
      });
      expect( checkbox.find("input").length ).toEqual(1);
    });

    it("should set checked to true when checked value is true", () => {
    });

    it("should call checkboxToggle when checkbox is clicked", () => {
      checkbox = shallow(<Checkbox value="" />);
      const instance = checkbox.instance();
      const spy = jest.spyOn(instance as Checkbox, "checkboxToggle" );
      instance.forceUpdate();
      checkbox.find("input").simulate("change");
      expect(spy).toHaveBeenCalled();
    });
  });
});
