import React, { Component } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UiItem/Button/Button";
import Input from "../../components/UiItem/Input/Input";
// import { NavLink } from "react-router-dom";
import axios from "axios";

// function validateEmail(email) {
//   const re = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
//   return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        // type: "email",
        type: "text",
        placeholder: "Email адрес",
        errorMessage: "Email адрес должен быть вида: ivanov@yandex.ru",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 4,
          // email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        placeholder: "Пароль",
        errorMessage: "Пароль должен быть длиной от 5-ти символов",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 4,
        },
      },
    },
  };

  loginHandler = async (email, password) => {
    // try {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };

    email = authData.email;
    password = authData.password;

    const response = await axios({
      method: "post",
      contentType: "application/x-www-form-urlencoded",
      url: "/login",
      data: encodeURI(`email=${email}&password=${password}`),
    });

    console.log(response);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    // if (validation.email) {
    //   isValid = validateEmail(value) && isValid;
    // }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }

    return isValid;
  }

  registerHandler = () => {};

  submitHandler = (event) => {
    event.preventDefault();
    // this.setState((prevState) => {
    //   return {
    //     ...prevState,
    //     isFormValid: true,
    //   };
    // });
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
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
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <p>Личный кабинет</p>
        <form
          onSubmit={this.submitHandler}
          // action="http://localhost:8080/login"
          // method="post"
        >
          <div>{this.renderInputs()}</div>
          <div className={classes.Buttons}>
            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
