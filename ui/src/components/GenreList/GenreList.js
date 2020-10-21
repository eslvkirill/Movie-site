import React, { Component } from "react";
import classes from "./GenreList.module.scss";
import Input from "../UiItem/Input/Input";
import Button from "../UiItem/Button/Button";
import Loader from "../UiItem/Loader/Loader";
import GenreItem from "./GenreItem/GenreItem";
import axios from "axios";

export default class GenreList extends Component {
  state = {
    genres: [],
    loading: true,
    formControls: {
      text: {
        value: "",
        // type: "email",
        type: "text",
        placeholder: "Введите новый жанр",
        errorMessage: "Название жанра должно быть длинее 2-х букв",
        valid: false,
        touched: false,
        validation: {
          required: true,
          maxLength: 255,
          minLength: 3,
          // email: true,
        },
      },
    },
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/api/genres");

      const genres = response.data;
      // console.log(genres);

      this.setState({ genres, loading: false });
      console.log(genres);
    } catch (e) {
      console.log(e);
    }
  }

  genreHandler = async () => {
    const genre = {
      name: this.state.formControls.text.value,
    };
    console.log(genre);
    // try {
    const response = await axios
      .post("http://localhost:8080/api/genres", { genre })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    console.log(response.data);
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

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.GenreList}>
        <form onSubmit={this.submitHandler}>
          {this.renderInputs()}
          {/* <input
            value={this.state.newItem}
            type="text"
            placeholder="Введите новый задачу"
            onChange={(text) => this.addNewItem(text)}
          /> */}
          <Button
            onClick={this.genreHandler}
            className={classes.AddGenre}
            disabled={!this.state.isFormValid}
          >
            Добавить жанр
          </Button>
        </form>
        <hr />
        {this.state.loading ? (
          <Loader />
        ) : (
          <GenreItem genres={this.state.genres} />
        )}
      </div>
    );
  }
}
