import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { isInvalid } from "../../../exportFunctions/validation/validation";
import "./Select.scss";

const TemplateSelect = (props) => {
  const selectType = props.type || "Select";

  return (
    <div className="Select">
      <Select
        type={selectType}
        components={makeAnimated()}
        styles={props.styles}
        options={props.options}
        onChange={props.onChange}
        isMulti={props.isMulti}
        value={props.value}
        isSearchable={props.isSearchable}
        placeholder={props.placeholder}
        closeMenuOnSelect={props.closeMenuOnSelect}
        noOptionsMessage={props.noOptionsMessage}
        isClearable={props.isClearable}
        defaultValue={props.defaultValue}
      />
      {isInvalid(props) ? (
        <span className="error">{props.errorMessage}</span>
      ) : null}
    </div>
  );
};

export default TemplateSelect;
