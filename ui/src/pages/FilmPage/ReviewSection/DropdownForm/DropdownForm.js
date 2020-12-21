import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
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
        autoComplete: "off",
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
    message: createTextarea(
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

  useEffect(() => {
    setFormControls({
      formInputControls: createFormInput(),
      formTextareaControls: createFormTextarea(),
    });
  }, [props.dropdown]);

  const publishReview = async () => {
    try {
      const review = {
        title: formControls.formInputControls.title.value,
        message: formControls.formTextareaControls.message.value,
      };

      const response = await axios({
        method: "post",
        contentType: "application/json",
        url: `/api/movies/${props.filmId}/reviews`,
        data: review,
      });

      const lastPageResponse = await axios.get(
        `/api/movies/${props.filmId}/reviews?page=${props.totalPages - 1}`
      );

      if (props.totalPages === 0) {
        props.setReviews(() => [...props.reviews, { ...response.data }]);
        props.setTotalElements((totalElements) => totalElements + 1);
      } else if (
        lastPageResponse.data.content.length === lastPageResponse.data.size
      ) {
        props.setReviewButtonActive((active) => !active);
        if (lastPageResponse.data.totalPages !== props.totalPages) {
          props.paginate(props.totalPages + 1);
          props.setTotalPages((totalPages) => totalPages + 1);
        } else {
          props.paginate(props.totalPages);
          props.setTotalPages((totalPages) => totalPages);
        }
      } else {
        props.setReviews(() => [
          ...lastPageResponse.data.content,
          response.data,
        ]);
        if (props.totalPages !== props.currentPage) {
          props.setCurrentPage((currentPage) => currentPage + 1);
        } else {
          props.setCurrentPage((currentPage) => currentPage);
        }
      }
      props.setReviewButtonActive(true);
    } catch (e) {
      console.log(e);
    }
  };

  const submitNewReview = (event) => {
    event.preventDefault();
    setFormControls({
      formInputControls: createFormInput(),
      formTextareaControls: createFormTextarea(),
    });
    setFormValid(false);
    props.setDropdawn(false);
  };

  const onChangeInputHandler = (event, controlName) => {
    const formInputControls = formControls.formInputControls;
    const control = { ...formInputControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    formInputControls[controlName] = control;

    setFormControls((prevState) => {
      return { ...prevState, formInputControls };
    });

    setFormValid(validateForm(formControls));
  };

  const onChangeTextareaHandler = (event, controlName) => {
    const formTextareaControls = formControls.formTextareaControls;
    const control = { ...formTextareaControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
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
          autoComplete={control.autoComplete}
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
      exit={true}
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
        <Button type="success" disabled={!isFormValid} onClick={publishReview}>
          Опубликовать
        </Button>
      </form>
    </CSSTransition>
  );
};

export default DropdownForm;
