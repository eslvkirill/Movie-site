import React from "react";
import classes from "./Input.module.scss";
import { isInvalid } from "../../../exportFunctions/validation/validation";

const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input, classes[props.type]];

  return (
    <div className={inputType === "file" ? classes.InputFile : inputType}>
      {inputType === "color" || inputType === "time" ? (
        <div className={inputType === "color" ? classes.Color : classes.Time}>
          {props.placeholder}
        </div>
      ) : null}
      <input
        placeholder={props.placeholder}
        type={inputType}
        id={props.id}
        accept={props.accept}
        className={cls.join(" ")}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
      />
      {inputType === "file" ? (
        <>
          <span
            id={props.idSpan}
            onClick={props.onClick}
            style={{
              // position: "relative",
              // bottom: "98%",
              // right: "0%",
              // zIndex: 99,
              width: 352,
              marginTop: -61,
              marginRight: -12,
              color: "rgb(168, 145, 118)",
              fontSize: 16,
              height: 10,
              cursor: "default",
              textAlign: "left",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            {props.title}
          </span>

          <span onClick={props.onClick} className={classes.Choice}>
            Выберите файл
          </span>

          {isInvalid(props) ? (
            <span className={classes.FileError}>{props.errorMessage}</span>
          ) : null}
        </>
      ) : null}

      {isInvalid(props) && inputType !== "file" ? (
        <span>{props.errorMessage}</span>
      ) : null}
    </div>
  );
};

export default Input;
