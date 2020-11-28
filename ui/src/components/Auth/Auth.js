import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { createInput } from "../../exportFunctions/creationEntity/createInput";
import {
  validate,
  validateInputs,
} from "../../exportFunctions/validation/validation";
import Button from "../../components/UiItem/Button/Button";
import Input from "../../components/UiItem/Input/Input";
import "./Auth.scss";

function createNewInput(type, placeholder, errorMessage) {
  return createInput(
    {
      type: type,
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
    },
    {
      required: true,
      minLength: 4,
      maxLength: 255,
      // email: true
    }
  );
}

function createFormControls() {
  return {
    email: createNewInput(
      "text",
      // type: "email",
      "Email адрес",
      "Email адрес должен быть вида: ivanov@yandex.ru"
    ),
    password: createNewInput(
      "password",
      "Пароль",
      "Пароль должен быть длиной от 5-ти символов"
    ),
  };
}

const Auth = () => {
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setFormValid] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);

  const loginHandler = async (email, password) => {
    try {
      const authData = {
        email: formControls.email.value,
        password: formControls.password.value,
      };

      email = authData.email;
      password = authData.password;

      await axios({
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        url: "/login",
        data: encodeURI(`email=${email}&password=${password}`),
      })
        .then((response) => console.log(response))
        .then(() => setAuthorized(!authorized));
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 404) {
        setAuthStatus(e.response.status);
        setFormControls(createFormControls());
        setFormValid(false);
      }
      // throw new Error("cdcd");
    }
  };

  const registerHandler = () => {};

  const submitHandler = (event) => {
    event.preventDefault();
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

  if (authorized) {
    return <Redirect from="/login" to="/" />;
  }

  // if (this.state.authorized) {
  //   throw new Error("I crashed!");
  // }

  return (
    <div className="Auth">
      <p>Личный кабинет</p>
      <form onSubmit={submitHandler}>
        <div>{renderInputs()}</div>
        {authStatus === 404 && (
          <span className="errorAuth">
            Пользователь с такими данными не зарегистрирован
          </span>
        )}
        <div className="Buttons">
          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button type="primary" onClick={registerHandler}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
