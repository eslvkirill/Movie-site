import React, { Component } from "react";
import axios from "axios";
import {
  createInput,
  createInputFile,
} from "../../exportFunctions/creationEntity/createInput";
import { createSelect } from "../../exportFunctions/creationEntity/createSelect";
import {
  validate,
  validateForm,
} from "../../exportFunctions/validation/validation";
import Input from "../UiItem/Input/Input";
import Button from "../UiItem/Button/Button";
import TemplateSelect from "../UiItem/Select/Select";
import FadeBlock from "../UiItem/FadeBlock/FadeBlock";
import "./FilmList.scss";

function createNewInput(placeholder, errorMessage) {
  return createInput(
    {
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
      // id: number,
    },
    { required: true, maxLength: 255, minLength: 1 }
  );
}

function createNewInputFile(id, title, errorMessage) {
  return createInputFile(
    { id: id, title: title, errorMessage: "*" + errorMessage },
    { required: false, imageFile: true }
  );
}

function createFormInput() {
  return {
    rusTitle: createNewInput(
      "Введите название на русском языке",
      "Поле не должно быть пустым и превышать 255 символов"
    ),
    engTitle: createNewInput(
      "Введите название на языке оригинала",
      "Поле не должно быть пустым и превышать 255 символов"
    ),
    tagline: createNewInput(
      "Введите слоган фильма",
      "Поле не должно быть пустым и превышать 255 символов"
    ),
    plot: createInput(
      {
        placeholder: "Опишите краткий сюжет",
        errorMessage: "Поле не может быть пустым",
      },
      { required: true, minLength: 1 }
    ),
    year: createInput(
      {
        type: "number",
        placeholder: "Введите год выхода фильма",
        errorMessage: "Год выхода фильма должен быть реальным",
      },
      {
        required: true,
        number: true,
        minLength: 4,
        maxLength: 4,
        minValue: 1888,
        // maxValue: 2030
      }
    ),
    // trailerUrl: createInput(
    //   {
    //     placeholder: "Вставьте ссылку трейлера с YouTube",
    //     errorMessage:
    //       "Поле не может быть пустым и должно быть с https://youtube.com/",
    //   },
    //   { required: true, minLength: 1, youTube: true }
    // ),
    // kinopoiskUrl: createInput(
    //   {
    //     placeholder: "Вставьте ссылку на Kinopoisk",
    //     errorMessage:
    //       "Поле не может быть пустым и должно быть с https://www.kinopoisk.ru/",
    //   },
    //   { required: true, minLength: 1, kinopoisk: true }
    // ),
    // IMDbUrl: createInput(
    //   {
    //     placeholder: "Вставьте ссылку на IMDb",
    //     errorMessage:
    //       "Поле не может быть пустым и должно быть с https://www.imdb.com/",
    //   },
    //   { required: true, minLength: 1, IMDb: true }
    // ),
    // price: createInput(
    //   {
    //     type: "number",
    //     placeholder: "Укажите цену продажи в рублях",
    //     errorMessage: "Поле не может быть пустым и отрицательным",
    //   },
    //   { required: true, number: true, minLength: 1, price: true }
    // ),
    poster: createNewInputFile(
      1,
      "Постер фильма",
      "Файл должен быть картинкой, не превышающей размер 1Мб"
    ),
    // background: createNewInputFile(2, "Фон страницы фильма"),
  };
}

function createNewSelect(
  placeholder,
  errorMessage,
  isMulti = true,
  closeMenuOnSelect = false
) {
  return createSelect(
    {
      placeholder: placeholder,
      errorMessage: "*" + errorMessage,
      isMulti: isMulti,
      closeMenuOnSelect: closeMenuOnSelect,
    },
    { select: true }
  );
}

function createFormSelect() {
  return {
    // genres: createNewSelect(
    //   "Укажите жанры фильма",
    //   "Жанр фильма должен быть указан"
    // ),
    // country: createNewSelect("Выберите страну производства"),
    // audioTracks: createNewSelect("Выберите языки аудиодорожек"),
    // subtitles: createNewSelect("Выберите языки субтитров"),
    // ageRating: createNewSelect("Выберите возрастной рэйтинг", false, true),
    // actors: createNewSelect("Выберите актеров"),
    // directors: createNewSelect("Выберите режиссеров"),
  };
}

export default class FilmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: {},
      isFormValid: false,
      formInputsControls: createFormInput(),
      formSelectControls: createFormSelect(),
      showBlock: false,
    };
    this.initialState = this.state;
  }

  async componentDidMount() {
    try {
      const response = await axios.get("/api/genres");

      const genres = response.data;

      const initialGenres = genres.map((genre) => ({
        label: genre.name,
        value: genre.id,
      }));

      // const film = this.state.film;
      // film.genres = initialGenres;

      const formSelectControls = this.state.formSelectControls;

      Object.keys(formSelectControls).map((controlName) => {
        const control = formSelectControls[controlName];

        if (controlName === "genres") {
          control.options = initialGenres;
        }

        return formSelectControls;
      });

      this.setState({ formSelectControls });
      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  }

  filmAddHandler = async () => {
    try {
      // let rusTitle = "";
      // const film = {
      //   rusTitle: this.state.rusTitle,
      // };
      // console.log(this.state);
      // let newItemId = "";
      // const genre = {
      //   name: this.state.newItem,
      // };
      // const response = await axios({
      //   method: "post",
      //   contentType: "application/json",
      //   url: "/api/genres",
      //   data: genre,
      // });
      // newItemId = response.data;
      // this.setState({ newItemId });

      this.setState({ showBlock: !this.state.showBlock });

      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  };

  onAddFileClickHandler = (controlName) => {
    document.getElementById(controlName).click();
  };

  clearInput = () => {
    const formInputsControls = this.state.formInputsControls;

    Object.keys(formInputsControls).map((controlName) => {
      const control = formInputsControls[controlName];
      control.idSpan = controlName + control.id;

      control.value = "";
      // control.errorMessage = "";

      if (control.type === "file") {
        const span = document.getElementById(control.idSpan);
        span.textContent = control.title;
        span.style.right = "19%";
        span.style.color = "rgb(168, 145, 118)";
      }

      return formInputsControls;
    });
  };

  clearSelect = () => {
    const formSelectControls = this.state.formSelectControls;

    Object.keys(formSelectControls).map((controlName) => {
      const control = formSelectControls[controlName];
      control.value = "";
      return formSelectControls;
    });
    this.setState({ formSelectControls });
  };

  filmResetHandler = () => {
    this.clearInput();
    this.clearSelect();
    this.setState({ film: {} });
    this.setState({ isFormValid: false });
    // this.setState({ showBlock: f });
    console.log(this.state);
  };

  submitNewFilm = async (event) => {
    event.preventDefault();
    this.clearInput();
    this.clearSelect();
    this.setState({ isFormValid: false });
    // this.setState({ showBlock: true });

    // const film = this.state.film;
    // let genres = film.genres;

    // genres = film.genres.map((genre) => ({
    //   id: genre.value,
    // }));
    // console.log(genres);

    // this.setState({ film });

    console.log(this.state);
  };

  onChangeHandler = (event, controlName) => {
    const formInputsControls = { ...this.state.formInputsControls };
    const formSelectControls = { ...this.state.formSelectControls };
    const control = { ...formInputsControls[controlName] };

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
        // const filename = event.target.files[0].name;
        // const span = document.getElementById(idSpan);
        span.textContent = filename.name;
        span.style.color = "#c76c04";
        span.style.right = "17%";
      }
    }

    const film = this.state.film;
    film[controlName] = control.value;

    formInputsControls[controlName] = control;

    // const film = this.state.film;
    // film[controlName] = control.value;

    this.setState({
      // film,
      formInputsControls,
      isFormValid: validateForm(formInputsControls, formSelectControls),
    });
  };

  onChangeSelectHandler = (event, controlName) => {
    const formSelectControls = { ...this.state.formSelectControls };
    const formInputsControls = { ...this.state.formInputsControls };
    const control = { ...formSelectControls[controlName] };

    const film = this.state.film;

    control.value = event;

    let value = control.value.map((value) => ({
      id: value.value,
    }));

    if (controlName === "genres") {
      film.genres = value;
    }

    control.touched = true;
    control.valid = validate(event, control.validation);

    formSelectControls[controlName] = control;

    // const film = this.state.film;
    // film[controlName] = control.value;

    this.setState({
      // film,
      formSelectControls,
      isFormValid: validateForm(formInputsControls, formSelectControls),
    });
  };

  renderInputs() {
    return Object.keys(this.state.formInputsControls).map(
      (controlName, index) => {
        const control = this.state.formInputsControls[controlName];
        return (
          <Input
            key={controlName + index}
            id={controlName}
            idSpan={controlName + control.id}
            type={control.type}
            placeholder={control.placeholder}
            value={control.value}
            accept={control.accept}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            autoComplete={control.autoComplete}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) => this.onChangeHandler(event, controlName)}
            onClick={() => this.onAddFileClickHandler(controlName)}
            title={control.title}
          />
        );
      }
    );
  }

  renderSelects() {
    return Object.keys(this.state.formSelectControls).map(
      (controlName, index) => {
        const control = this.state.formSelectControls[controlName];
        return (
          <TemplateSelect
            key={controlName + index}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            options={control.options}
            onChange={(event) => this.onChangeSelectHandler(event, controlName)}
            isMulti={control.isMulti}
            isSearchable={control.isSearchable}
            isClearable={control.isClearable}
            placeholder={control.placeholder}
            closeMenuOnSelect={control.closeMenuOnSelect}
            noOptionsMessage={control.noOptionsMessage}
            value={control.value}
          />
        );
      }
    );
  }

  render() {
    return (
      <>
        <FadeBlock
          showBlock={this.state.showBlock}
          rusTitle={this.state.film.rusTitle}
        />
        <form
          className="FilmList"
          onSubmit={(event) => this.submitNewFilm(event)}
        >
          <div className="AddTitle">Создание фильма</div>
          <div className="FilmListInputs">
            {this.renderInputs()}
            {this.renderSelects()}
          </div>
          <div className="Buttons">
            <Button
              onClick={() => this.filmAddHandler()}
              disabled={!this.state.isFormValid}
              type="success"
            >
              Создать фильм
            </Button>
            <Button onClick={() => this.filmResetHandler()} type="reset">
              Сбросить параметры
            </Button>
          </div>
        </form>
      </>
    );
  }
}
