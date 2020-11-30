import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
  const buttonType = props.type || "success";

  const cls = [classes.Button, classes[props.type], buttonType];

  return (
    <button
      id={props.id}
      onClick={props.onClick}
      type={buttonType}
      className={cls.join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
