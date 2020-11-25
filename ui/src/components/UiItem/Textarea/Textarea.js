import React from "react";
import { isInvalid } from "../../../exportFunctions/validation/validation";
import "./Textarea.scss";

const Textarea = (props) => (
  <div className="textarea">
    <textarea
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
    />
    {isInvalid(props) ? (
      <span className="error">{props.errorMessage}</span>
    ) : null}
  </div>
);

export default Textarea;
