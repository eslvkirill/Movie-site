import React from "react";
import Input from "../../components/UiItem/Input/Input";
import { validate, validateInputs } from "../validation/validation";

const onChangeHandler = (
  event,
  controlName,
  formControls,
  setFormControls,
  setFormValid
) => {
  const control = formControls[controlName];

  control.value = event.target.value;
  control.touched = true;
  control.valid = validate(control.value, control.validation);

  formControls[controlName] = control;

  setFormControls((prevState) => ({ ...prevState, ...formControls }));
  setFormValid(validateInputs(formControls));
};

export const renderInputs = (formControls, setFormControls, setFormValid) => {
  return Object.keys(formControls).map((controlName, index) => {
    const control = formControls[controlName];
    return (
      <Input
        key={controlName + index}
        type={control.type}
        placeholder={control.placeholder}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        label={control.label}
        shouldValidate={!!control.validation}
        errorMessage={control.errorMessage}
        onChange={(event) => onChangeHandler(event, controlName)}
      />
    );
  });
};

export const submitHandler = (event) => {
  event.preventDefault();
};
