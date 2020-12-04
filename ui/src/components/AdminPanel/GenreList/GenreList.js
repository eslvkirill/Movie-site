import React, { Component } from "react";
import axios from "axios";
import Input from "../../UiItem/Input/Input";
import Button from "../../UiItem/Button/Button";
import ContentLoader from "../../UiItem/Loaders/ContentLoader/ContentLoader";
import GenreItem from "./GenreItem/GenreItem";
import {
  validate,
  validateInputs,
} from "../../../exportFunctions/validation/validation";
import "./GenreList.scss";

export default class GenreList extends Component {
  state = {
    genres: [],
    loading: true,
    newItem: "",
    newItemId: "",
    value: "",
    disabled: false,
    formControls: {
      text: {
        value: "",
        // type: "email",
        type: "text",
        placeholder: "Введите новый жанр",
        errorMessage: "*Название жанра должно быть длинее 2-х букв",
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
      let newItemId = "";

      const genre = {
        name: this.state.newItem,
      };

      const response = await axios({
        method: "post",
        contentType: "application/json",
        url: "/api/genres",
        data: genre,
      });

      newItemId = response.data;

      this.setState({ newItemId });
    } catch (e) {
      console.log(e);
    }
  };

  button1Click = (genreId) => {
    const genres = this.state.genres;

    const index = genres.findIndex((genre) => genre.id === genreId);

    if (genres[index] !== undefined) {
      genres[index].open = !genres[index].open;
    }

    this.setState(genres);
  };

  button2Click = async (genreId) => {
    try {
      const genres = this.state.genres;
      const newItemId = this.state.newItemId;
      const index = genres.findIndex((genre) => genre.id === genreId);

      if (genres[index] !== undefined) {
        genres[index].open = !genres[index].open;
      }

      this.setState({ genres, newItemId });

      if (genres[index].id === "") {
        genres[index].id = newItemId;
      }

      console.log(this.state);

      await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: `/api/genres/${genres[index].id}`,
        data: { name: genres[index].name },
      });

      console.log(genres[index]);
    } catch (e) {
      console.log(e);
    }
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
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateInputs(formControls),
      newItem: control.value,
    });
  };

  submitNewGenre = (event) => {
    event.preventDefault();
    const genres = this.state.genres;
    const newItem = this.state.newItem;
    const newItemId = this.state.newItemId;

    if (newItem.length > 0) {
      this.setState({
        genres: [
          ...genres,
          {
            id: newItemId,
            name: newItem,
          },
        ],
        newItem: "",
        newItemId: "",
      });
    }
    console.log(this.state);
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
      <div className="GenreList">
        <h2>Добавление жанров фильмам</h2>

        <form onSubmit={(event) => this.submitNewGenre(event)}>
          {this.renderInputs()}
          <Button
            type="add"
            onClick={this.genreHandler}
            disabled={!this.state.isFormValid}
          >
            Добавить
          </Button>
        </form>
        <hr />
        {this.state.loading ? (
          <ContentLoader />
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
