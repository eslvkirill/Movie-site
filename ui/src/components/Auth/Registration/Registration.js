import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { createInput } from "../../../exportFunctions/creationEntity/createInput";
import {
  validate,
  validateInputs,
} from "../../../exportFunctions/validation/validation";
import { useUserAuth } from "../../../containers/UserContext/UserContext";
import Button from "../../../components/UiItem/Button/Button";
import Input from "../../../components/UiItem/Input/Input";
import "./Registration.scss";

function createNewInput(
  type,
  placeholder,
  errorMessage,
  minLength,
  maxLength,
  email = false
) {
  return createInput(
    {
      type: type,
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
    },
    {
      required: true,
      minLength: minLength,
      maxLength: maxLength,
      email: email,
    }
  );
}

function createFormControls() {
  return {
    firstName: createNewInput(
      "text",
      "Имя",
      "Имя должен быть длиной от 2-х до 50-ти букв",
      2,
      50
    ),
    lastName: createNewInput(
      "text",
      "Фамилия",
      "Фамилия должна быть длиной от 2-х до 100-ти букв",
      2,
      100
    ),
    username: createNewInput(
      "text",
      "Имя пользователя",
      "Имя пользователя должно быть длиной от 3-х до 100-та символов",
      3,
      100
    ),
    email: createNewInput(
      "email",
      "Email адрес",
      "Почта должна быть вида ivanov@yandex.ru",
      0,
      255,
      true
    ),
    password: createNewInput(
      "password",
      "Пароль",
      "Пароль должен быть длиной от 6-ти символов",
      6,
      255
    ),
  };
}

const Registration = () => {
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setFormValid] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState();
  const [user, setUser] = useUserAuth();

  const registrationHandler = async () => {
    try {
      const authData = Object.keys(formControls).reduce((authData, name) => {
        authData[name] = formControls[name].value;
        return authData;
      }, {});

      await axios({
        method: "post",
        url: "/api/users",
        data: authData,
      }).then((response) => setUser(response.data));
    } catch (e) {
      if (e.response.status === 400) {
        setAuthErrorMessage(Object.values(e.response.data.errors).toString());
        setFormControls(createFormControls());
        setFormValid(false);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    clearInputs();
    setFormValid(false);
  };

  const onChangeHandler = (event, controlName) => {
    const control = formControls[controlName];

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    setFormControls((prevState) => ({ ...prevState, ...formControls }));
    setFormValid(validateInputs(formControls));
  };

  const clearInputs = () => {
    Object.keys(formControls).map((controlName) => {
      const control = formControls[controlName];
      control.value = "";
      return formControls;
    });
  };

  const renderInputs = () => {
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

  if (user !== null) {
    return <Redirect from="/registration" to="/" />;
  }

  return (
    <div className="auth authRegistration">
      <h1>Регистрация</h1>
      <form onSubmit={submitHandler} className="registration">
        <div className="renderInputs">{renderInputs()}</div>
        {authErrorMessage && (
          <span className="errorLogin">*{authErrorMessage}</span>
        )}
        <div className="Buttons">
          <Link to="/login" className="back">
            <Button type="primary primaryBack">Назад</Button>
          </Link>
          <Button
            type="success successRegistration"
            onClick={registrationHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
