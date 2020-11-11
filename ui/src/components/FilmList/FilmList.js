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
        errorMessage: "*Поле не может быть пустым",
      },
      { required: true, minLength: 1 }
    ),
    year: createInput(
      {
        type: "number",
        placeholder: "Введите год выхода фильма",
        errorMessage: "*Год выхода фильма должен быть реальным",
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
    trailerUrl: createInput(
      {
        placeholder: "Вставьте ссылку трейлера с YouTube",
        errorMessage:
          "*Поле не может быть пустым и должно быть с https://youtube.com/",
      },
      { required: true, minLength: 1, youTube: true }
    ),
    kinopoiskUrl: createInput(
      {
        placeholder: "Вставьте ссылку на Kinopoisk",
        errorMessage:
          "*Поле не может быть пустым и должно быть с https://www.kinopoisk.ru/",
      },
      { required: true, minLength: 1, kinopoisk: true }
    ),
    imdbUrl: createInput(
      {
        placeholder: "Вставьте ссылку на IMDb",
        errorMessage:
          "*Поле не может быть пустым и должно быть с https://www.imdb.com/",
      },
      { required: true, minLength: 1, IMDb: true }
    ),
    price: createInput(
      {
        type: "number",
        placeholder: "Укажите цену продажи в рублях",
        errorMessage: "*Поле не может быть пустым и отрицательным",
      },
      { required: true, number: true, minLength: 1, price: true }
    ),
    poster: createNewInputFile(
      1,
      "Постер фильма",
      "Файл должен быть картинкой, не превышающей размер 1Мб"
    ),
    background1: createNewInputFile(
      2,
      "Фон страницы фильма №1",
      "Файл должен быть картинкой, не превышающей размер 1Мб"
    ),
    background2: createNewInputFile(
      3,
      "Фон страницы фильма №2",
      "Файл должен быть картинкой, не превышающей размер 1Мб"
    ),
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
    genres: createNewSelect(
      "Укажите жанры фильма",
      "Жанр фильма должен быть указан"
    ),
    // actors: createNewSelect("Выберите актеров"),
    // directors: createNewSelect("Выберите режиссеров"),
    country: createNewSelect(
      "Выберите страны производства",
      "Укажите хотя-бы одну страну производства",
      false,
      true
    ),
    audio: createNewSelect(
      "Выберите языки аудиодорожек",
      "У фильма должна быть хотя-бы одна аудиодорожка"
    ),
    subtitles: createNewSelect(
      "Выберите языки субтитров",
      "У фильма должен быть хотя-бы один язык для субтитров"
    ),
    ageRating: createNewSelect(
      "Выберите возрастной рэйтинг",
      "У фильма должен быть возрастной рейтинг",
      false,
      true
    ),
  };
}

export default class FilmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: {},
      isFormValid: false,
      formControls: {
        formInputsControls: createFormInput(),
        formSelectControls: createFormSelect(),
      },
      showBlock: false,
    };
    this.initialState = this.state;
  }

  async componentDidMount() {
    try {
      const responseGenres = await axios.get("/api/genres");

      const genres = responseGenres.data;

      const initialGenres = genres.map((genre) => ({
        label: genre.name,
        value: genre.id,
      }));

      const response = await axios.get("/api/movies/saving");
      console.log(response.data);

      const formSelectControls = this.state.formControls.formSelectControls;

      Object.keys(response.data).map((dataName) => {
        const data = response.data[dataName];
        const initialState = data.map((data, index) => ({
          label: data,
          value: index,
        }));

        Object.keys(formSelectControls).map((controlName) => {
          const control = formSelectControls[controlName];

          if (
            dataName === controlName ||
            (dataName === "countries" && controlName === "country") ||
            (dataName === "ageRatings" && controlName === "ageRating") ||
            (dataName === "languages" &&
              (controlName === "audio" || controlName === "subtitles"))
          )
            control.options = initialState;

          return formSelectControls;
        });

        return initialState;
      });

      Object.keys(formSelectControls).map((controlName) => {
        const control = formSelectControls[controlName];

        if (controlName === "genres") {
          control.options = initialGenres;
        }

        return formSelectControls;
      });

      this.setState({ formSelectControls });
    } catch (e) {
      console.log(e);
    }
  }

  filmAddHandler = async () => {
    try {
      const film = this.state.film;
      this.setState({ showBlock: !this.state.showBlock });

      const formData = Object.keys(film).reduce((formData, name) => {
        formData.append(name, film[name]);
        return formData;
      }, new FormData());

      await axios({
        method: "post",
        contentType: "multipart/form-data",
        url: "/api/movies",
        data: formData,
      });

      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  };

  onAddFileClickHandler = (controlName) => {
    document.getElementById(controlName).click();
  };

  clearInput = () => {
    const formInputsControls = this.state.formControls.formInputsControls;

    Object.keys(formInputsControls).map((controlName) => {
      const control = formInputsControls[controlName];
      control.idSpan = controlName + control.id;

      control.value = "";

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
    const formControls = this.state.formControls;
    const formSelectControls = formControls.formSelectControls;

    Object.keys(formSelectControls).map((controlName) => {
      const control = formSelectControls[controlName];
      control.value = "";
      return formSelectControls;
    });
    this.setState({ formControls });
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
    console.log(this.state);
  };

  onChangeHandler = (event, controlName) => {
    const formControls = this.state.formControls;
    const formInputsControls = formControls.formInputsControls;
    const control = { ...formInputsControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    let idSpan = control.idSpan;
    idSpan = controlName + control.id;
    const span = document.getElementById(idSpan);

    if (control.type === "file") {
      const filename = event.target.files[0];

      console.log(this.state);

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
    }

    const film = this.state.film;

    if (control.type === "file") {
      film[controlName] = event.target.files[0];
    }

    film[controlName] = control.value;

    formInputsControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  onChangeSelectHandler = (event, controlName) => {
    const formControls = this.state.formControls;
    const formSelectControls = formControls.formSelectControls;
    const control = { ...formSelectControls[controlName] };

    const film = this.state.film;

    control.value = event;

    if (control.value === "") control.errorMessage = "";

    control.valid = validate(control.value, control.validation);

    if (control.isMulti === false && control.value !== null) {
      if (controlName) film[controlName] = Object.values(control.value)[0];
    }

    if (control.isMulti === true && control.value !== null) {
      if (controlName)
        film[controlName] = control.value.map(
          (selectValue) => selectValue.label
        );

      if (controlName === "genres") {
        film[controlName] = control.value.map((genreValue) => genreValue.value);
      }
    }

    control.touched = true;

    formSelectControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderInputs() {
    const formInputsControls = this.state.formControls.formInputsControls;
    return Object.keys(formInputsControls).map((controlName, index) => {
      const control = formInputsControls[controlName];
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
    });
  }

  renderSelects() {
    const formSelectControls = this.state.formControls.formSelectControls;
    return Object.keys(formSelectControls).map((controlName, index) => {
      const control = formSelectControls[controlName];
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
    });
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