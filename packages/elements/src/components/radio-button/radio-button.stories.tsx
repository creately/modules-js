import React from "react";
import { RadioButton } from "./radio-button";

export default {
  title: "RadioButton",
  component: RadioButton,
};

export const Default = () => (
  <div>
    <RadioButton name="gender" value="male">
      Male
    </RadioButton>
    <RadioButton name="gender" value="female">
      Female
    </RadioButton>
  </div>
);
