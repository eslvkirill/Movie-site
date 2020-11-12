export function createSelect(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    isSearchable: true,
    isClearable: true,
    value: "",
    options: [],
    noOptionsMessage: () => "Список пуст",
  };
}
