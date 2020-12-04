export function createInput(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "off",
    value: "",
  };
}

export function createColorInput(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "on",
    type: "color",
    errorMessage: "*Выберите цвет",
    value: "#bd5a31",
  };
}

export function createInputFile(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "on",
    value: "",
    type: "file",
    accept: "image/*",
    idSpan: "",
  };
}
