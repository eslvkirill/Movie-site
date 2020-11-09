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

export function createInputFile(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "off",
    value: "",
    type: "file",
    accept: "image/*",
    idSpan: "",
  };
}
