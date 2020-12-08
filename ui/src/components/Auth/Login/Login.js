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
import "./Login.scss";

function createNewInput(type, placeholder, errorMessage, minLength) {
  return createInput(
    {
      type: type,
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
    },
    {
      required: true,
      minLength: minLength,
      maxLength: 255,
    }
  );
}

function createFormControls() {
  return {
    login: createNewInput(
      "text",
      "Имя пользователя или Email адрес",
      "Минимальная длина поля 3 символа",
      3
    ),
    password: createNewInput(
      "password",
      "Пароль",
      "Пароль должен быть длиной от 6-ти символов",
      6
    ),
  };
}

const Login = () => {
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setFormValid] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);
  const [user, setUser] = useUserAuth();

  const loginHandler = async (login, password) => {
    try {
      const authData = Object.keys(formControls).reduce((authData, name) => {
        authData[name] = formControls[name].value;
        return authData;
      }, {});

      login = authData.login;
      password = authData.password;

      await axios({
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        url: "/login",
        data: encodeURI(`login=${login}&password=${password}`),
      }).then((response) => setUser(response.data));
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 404) {
        setAuthStatus(e.response.status);
        setFormControls(createFormControls());
        setFormValid(false);
      }
    }
  };

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

  if (user !== null) {
    return <Redirect from="/login" to="/" />;
  }

  return (
    <form onSubmit={submitHandler} className="login">
      <div className="renderInputs">{renderInputs()}</div>

      {authStatus === 404 && (
        <span className="errorLogin">
          *Пользователь с такими данными не зарегистрирован
        </span>
      )}
      <div className="Buttons">
        <Button
          type="success"
          onClick={() => {
            loginHandler();
          }}
          disabled={!isFormValid}
        >
          Войти
        </Button>
        <Link to="/registration" className="regForm">
          <Button type="primary">Регистрация</Button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
