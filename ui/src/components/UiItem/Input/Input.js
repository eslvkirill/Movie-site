import React from "react";
import classes from "./Input.module.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || "text";
  // const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={classes.Input}>
      <input
        placeholder={props.placeholder}
        type={inputType}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Введите верное значение"}</span>
      ) : null}
    </div>
  );
};

export default Input;
