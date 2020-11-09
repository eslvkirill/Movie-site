import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { isInvalid } from "../../../exportFunctions/validation/validation";
import SelectStyle from "./SelectStyle";
import "./Select.scss";

const TemplateSelect = (props) => (
  <div className="Select">
    <Select
      components={makeAnimated()}
      styles={SelectStyle}
      options={props.options}
      onChange={props.onChange}
      isMulti={props.isMulti}
      value={props.value}
      isSearchable={props.isSearchable}
      placeholder={props.placeholder}
      closeMenuOnSelect={props.closeMenuOnSelect}
      noOptionsMessage={props.noOptionsMessage}
      isClearable={props.isClearable}
    />
    {isInvalid(props) ? (
      <span className="error">{props.errorMessage}</span>
    ) : null}
  </div>
);

export default TemplateSelect;
