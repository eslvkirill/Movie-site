export function createInput(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "on",
    value: "",
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
