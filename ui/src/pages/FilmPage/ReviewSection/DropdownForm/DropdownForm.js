import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Input from "../../../../components/UiItem/Input/Input";
import Button from "../../../../components/UiItem/Button/Button";
import Textarea from "../../../../components/UiItem/Textarea/Textarea";
import {
  validate,
  validateForm,
} from "../../../../exportFunctions/validation/validation";
import { createInput } from "../../../../exportFunctions/creationEntity/createInput";
import { createTextarea } from "../../../../exportFunctions/creationEntity/createTextarea";
import "./DropdownForm.scss";

function createFormInput() {
  return {
    title: createInput(
      {
        type: "text",
        placeholder: "Ваше общее впечатление в двух словах",
        errorMessage: "*Заполните поле",
      },
      {
        required: true,
        minLength: 1,
        maxLength: 250,
      }
    ),
  };
}

function createFormTextarea() {
  return {
    text: createTextarea(
      {
        type: "text",
        placeholder: "Текст отзыва",
        errorMessage: "*Ваш отзыв не может быть пустым",
      },
      {
        required: true,
        minLength: 1,
      }
    ),
  };
}

const DropdownForm = (props) => {
  const [formControls, setFormControls] = useState({
    formInputControls: createFormInput(),
    formTextareaControls: createFormTextarea(),
  });
  const [isFormValid, setFormValid] = useState(false);

  const submitNewReview = (event) => {
    event.preventDefault();
    props.setReviews([
      ...props.reviews,
      {
        id: props.reviews.length + 11,
        name: "Игорь",
        date: Date(),
        title: formControls.formInputControls["title"].value,
        text: formControls.formTextareaControls["text"].value,
      },
    ]);
    setFormControls(
      { ...formControls },
      (formControls.formInputControls["title"].value = ""),
      (formControls.formTextareaControls["text"].value = "")
    );
    setFormValid(false);
  };

  const onChangeInputHandler = (event, controlName) => {
    const formInputControls = formControls.formInputControls;
    const control = { ...formInputControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    console.log(control.value);
    formInputControls[controlName] = control;

    setFormControls((prevState) => {
      return { ...prevState, formInputControls };
    });

    setFormValid(validateForm(formControls));
  };

  const onChangeTextareaHandler = (event, controlName) => {
    const formTextareaControls = formControls.formTextareaControls;
    const control = { ...formTextareaControls[controlName] };

    console.log(control);
    console.log(controlName + " " + event.target.value);
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    console.log(control.value);
    formTextareaControls[controlName] = control;

    setFormControls((prevState) => {
      return { ...prevState, formTextareaControls };
    });

    setFormValid(validateForm(formControls));
  };

  const renderInputControls = () => {
    const formInputControls = formControls.formInputControls;
    return Object.keys(formInputControls).map((controlName, index) => {
      const control = formInputControls[controlName];
      return (
        <Input
          key={index}
          className={"reviewInput"}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeInputHandler(event, controlName)}
        />
      );
    });
  };

  const renderTextareaControls = () => {
    const formTextareaControls = formControls.formTextareaControls;
    return Object.keys(formTextareaControls).map((controlName, index) => {
      const control = formTextareaControls[controlName];
      return (
        <Textarea
          key={index}
          id={controlName}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeTextareaHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <CSSTransition
      in={props.dropdown}
      appear={true}
      unmountOnExit={true}
      classNames="fade"
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <form
        className="addReviewWrapper"
        onSubmit={(event) => submitNewReview(event)}
      >
        <div className="addReview">
          {renderInputControls()}
          {renderTextareaControls()}
        </div>
        <Button type="success" disabled={!isFormValid}>
          Опубликовать
        </Button>
      </form>
    </CSSTransition>
  );
};

export default DropdownForm;
