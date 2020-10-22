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
    newItem: "",
    value: "",
    disabled: false,
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

      genres.map((genre) => {
        genre.open = false;
        return genre;
      });

      this.setState({ genres, loading: false });
      console.log(genres);
    } catch (e) {
      console.log(e);
    }
  }

  genreHandler = async () => {
    try {
      const genre = {
        name: this.state.newItem,
      };

      await axios({
        method: "post",
        contentType: "application/json",
        url: "/api/genres",
        data: genre,
      });
    } catch (e) {
      console.log(e);
    }
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

  button1Click = (genreId) => {
    const genres = this.state.genres;

    const index = genres.findIndex((genre) => genre.id === genreId);

    if (genres[index] !== undefined) {
      genres[index].open = !genres[index].open;
    }

    this.setState(genres);
  };

  button2Click = (genreId) => {
    const genres = this.state.genres;

    const index = genres.findIndex((genre) => genre.id === genreId);

    if (genres[index] !== undefined) {
      genres[index].open = !genres[index].open;
    }

    this.setState(genres);
  };

  editHandler = (e, genreId) => {
    const genres = this.state.genres;
    let value = this.state.value;

    genres.map((genre) => {
      if (genre.id === genreId) {
        value = e.target.value;
        genre.name = value;

        //   if (
        //     genre.name.trim().length <
        //     this.state.formControls["text"].validation.minLength
        //   ) {
        //     this.setState({ disabled: true });
        //   } else this.setState({ disabled: false });
        // }
      }
      return genres;
    });

    this.setState({ genres });
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
      newItem: control.value,
    });
  };

  submitNewGenre = (event) => {
    event.preventDefault();
    const genres = this.state.genres;
    const newItem = this.state.newItem;
    if (newItem.length > 0) {
      this.setState({
        genres: [
          ...genres,
          {
            name: newItem,
          },
        ],
        newItem: "",
      });
    }
    console.log(this.state.newItem);

    console.log(this.state);
    console.log(this.state.newItem);
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          placeholder={control.placeholder}
          value={this.state.newItem}
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
      <div className={classes.GenreList}>
        <form onSubmit={(event) => this.submitNewGenre(event)}>
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
          <GenreItem
            genres={this.state.genres}
            Click={this.button1Click}
            Click2={this.button2Click}
            onChangeHandler={this.editHandler}
            // disabled={this.state.disabled}
          />
        )}
      </div>
    );
  }
}
