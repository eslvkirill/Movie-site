function validateEmail(email) {
  const re = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

function validateYouTubeUrl(youTube) {
  const regexp = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;
  return regexp.test(String(youTube).toLowerCase());
}

function validateIMDbUrl(IMDb) {
  const regexp = /http(?:s?):\/\/(?:www\.)?imdb.com\/title\/tt[\d]+\/?[\w?=_\-&]*/;
  return regexp.test(String(IMDb).toLowerCase());
}

function validateKinopoiskUrl(kinopoisk) {
  const regexp = /http(?:s?):\/\/(?:www\.)?kinopoisk.ru\/film\/[\d]+\/?/;
  return regexp.test(String(kinopoisk).toLowerCase());
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (validation.email) {
    isValid = validateEmail(value) && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }

  if (validation.minValue) {
    isValid = value >= validation.minValue && isValid;
  }

  if (validation.maxValue) {
    isValid = value <= validation.maxValue && isValid;
  }

  if (validation.price) {
    isValid = parseInt(value) && value >= 0 && isValid;
  }

  if (validation.number) {
    isValid = parseInt(value) && isValid;
  }

  if (validation.youTube) {
    isValid = validateYouTubeUrl(value) && isValid;
  }

  if (validation.IMDb) {
    isValid = validateIMDbUrl(value) && isValid;
  }

  if (validation.kinopoisk) {
    isValid = validateKinopoiskUrl(value) && isValid;
  }

  if (validation.select) {
    isValid = value !== null && value.length >= 1 && isValid;
  }

  if (validation.imageFile) {
    isValid =
      (value.type === "image/png" ||
        value.type === "image/jpg" ||
        value.type === "image/jpeg" ||
        value.type === "image/svg") &&
      value.size < 10485760 &&
      isValid;
  }

  // (sFileExtension === "pdf" ||
  //             sFileExtension === "doc" ||
  //             sFileExtension === "docx") || iFileSize > 10485760)

  return isValid;
}

export function validateForm(formInputsControls, formSelectControls) {
  let isFormValid = true;

  for (let control in formInputsControls) {
    if (formInputsControls.hasOwnProperty(control)) {
      isFormValid =
        formInputsControls[control].valid &&
        formInputsControls[control].value !== "" &&
        isFormValid;
    }
  }

  for (let control in formSelectControls) {
    if (formSelectControls.hasOwnProperty(control)) {
      isFormValid =
        formSelectControls[control].valid &&
        formSelectControls[control].value !== "" &&
        isFormValid;
    }
  }

  return isFormValid;
}

export function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}
