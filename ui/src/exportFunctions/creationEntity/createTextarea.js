export function createTextarea(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    autoComplete: "off",
    value: "",
  };
}
