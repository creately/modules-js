import "./button.scss";
import React from "react";

export interface ButtonProps {
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const className = props?.primary ? "button primary" : "button";
  return <button className={className}>{props.children}</button>;
};
