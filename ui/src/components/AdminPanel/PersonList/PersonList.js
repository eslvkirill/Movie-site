import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../UiItem/Input/Input";
import Button from "../../UiItem/Button/Button";
import {
  createInput,
  createInputFile,
} from "../../../exportFunctions/creationEntity/createInput";
import {
  validate,
  validateInputs,
} from "../../../exportFunctions/validation/validation";
import "./PersonList.scss";

function createNewInput(placeholder, errorMessage) {
  return createInput(
    {
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
    },
    { required: true, maxLength: 255, minLength: 1 }
  );
}

function createNewInputFile(id = 0, title, errorMessage) {
  return createInputFile(
    { id: id, title: title, errorMessage: "*" + errorMessage },
    { required: false, imageFile: true }
  );
}

function createFormInput() {
  return {
    firstName: createNewInput(
      "Введите имя человека",
      "Поле не должно быть пустым"
    ),
    lastName: createNewInput(
      "Введите фамилию человека",
      "Поле не должно быть пустым"
    ),
    image: createNewInputFile(
      1,
      "Фото человека",
      "Файл должен быть картинкой, не превышающей размер 1Мб"
    ),
  };
}

const PersonList = (props) => {
  const [formControls, setFormControls] = useState(createFormInput());
  const [isFormValid, setFormValid] = useState(false);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setFormControls(createFormInput());
  }, []);

  const personAddHandler = async () => {
    try {
      console.log(person);
      const formData = Object.keys(person).reduce((formData, name) => {
        formData.append(name, person[name]);
        return formData;
      }, new FormData());

      await axios({
        method: "post",
        contentType: "multipart/form-data",
        url: "/api/people",
        data: formData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const personSubmitHandler = (event) => {
    event.preventDefault();
    clearInputs();
    setFormValid(false);
  };

  const clearInputs = () => {
    Object.keys(formControls).map((controlName) => {
      const control = formControls[controlName];
      control.idSpan = controlName + control.id;
      control.value = "";

      if (control.type === "file") {
        const span = document.getElementById(control.idSpan);
        span.textContent = control.title;
        span.style.right = "19%";
        span.style.color = "rgb(168, 145, 118)";
      }

      return formControls;
    });
  };

  const onAddFileClickHandler = (controlName) => {
    document.getElementById(controlName).click();
  };

  const onChangeInputHandler = (event, controlName) => {
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    let idSpan = control.idSpan;
    idSpan = controlName + control.id;
    const span = document.getElementById(idSpan);

    if (control.type === "file") {
      const filename = event.target.files[0];
      if (filename === undefined) {
        control.valid = false;
        span.textContent = control.title;
        span.style.right = "19%";
        span.style.color = "rgb(168, 145, 118)";
      }

      if (filename) {
        control.valid = validate(filename, control.validation);
        span.textContent = filename.name;
        span.style.color = "#c76c04";
        span.style.right = "17%";
      }
      person[controlName] = filename;
    } else person[controlName] = control.value;

    formControls[controlName] = control;

    setPerson(person);
    setFormControls((prev) => ({ ...prev, ...formControls }));
    setFormValid(validateInputs(formControls));
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          id={controlName}
          idSpan={controlName + control.id}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          accept={control.accept}
          label={control.label}
          valid={control.valid}
          title={control.title}
          touched={control.touched}
          autoComplete={control.autoComplete}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeInputHandler(event, controlName)}
          onClick={() => onAddFileClickHandler(controlName)}
        />
      );
    });
  };

  return (
    <div className="personList">
      {/* <h2>Добавление актёров и режиссёров</h2> */}
      <form onSubmit={(event) => personSubmitHandler(event)}>
        <div className="renderInputs">{renderInputs()}</div>
        <Button
          onClick={personAddHandler}
          className="addPerson"
          disabled={!isFormValid}
        >
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default PersonList;
