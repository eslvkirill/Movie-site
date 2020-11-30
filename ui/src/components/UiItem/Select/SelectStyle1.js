const primaryColor = "#c76c04";

const SelectStyle1 = {
  control: (provided) => ({
    margin: 0,
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 48.8,
    ...provided,
    width: 352,
    maxHeight: 48.8,
    height: 48.8,
    fontSize: 18,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowX: "hidden",
    overflowY: "scroll",
    border: `2px solid ${primaryColor}`,
    background: "#fff",
    color: primaryColor,
    borderColor: primaryColor,
    borderStyle: "solid",
    borderWidth: 2,
    boxShadow: "none",

    ":hover": {
      borderColor: primaryColor,
    },

    "::-webkit-scrollbar": {
      width: 0,
    },

    ">div": {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      paddingRight: 2,
      boxSizing: "border-box",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgb(168, 145, 118);",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: 0,
    width: "100%",
    margin: "auto",
    marginBottom: 0,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    paddingLeft: 10,
    background: "#fff",
    borderRadius: 10,
    ":hover": {
      borderColor: "red",
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    background: "#fff",
    borderRadius: 10,
    ":hover": {
      borderColor: "red",
      cursor: "pointer",
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: primaryColor,
    position: "absolute",
    top: "8%",
    right: "12%",
    padding: 0,
    transition: ".2s",
    ":hover": {
      color: "red",
      transition: ".2s",
      cursor: "pointer",
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: primaryColor,
    position: "absolute",
    top: "9%",
    fontWeight: "bold",
    right: "0.5%",
    transition: ".2s",
    ":hover": {
      color: "#a35b09",
      cursor: "pointer",
      transition: ".2s",
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    background: primaryColor,
    width: 2,
    height: "90%",
    marginTop: 2.35,
    marginBottom: 0,
    marginRight: 35,
    marginLeft: 15,
  }),
  input: (styles) => ({
    ...styles,
    color: primaryColor,
    maxHeight: 40,
    marginLeft: -18,
    marginTop: -2,
    paddingTop: 0,
  }),
  container: (styles) => ({
    ...styles,
    // color: "#c76c04",
    // ":hover": {
    background: "#fff",
    borderRadius: 10,
    padding: 0,
    margin: 0,
    maxHeight: 48.8,
    ":hover": {
      borderColor: "red",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: `2px dotted ${primaryColor}`,
    color: state.isSelected ? primaryColor : primaryColor,
    fontWeight: state.isSelected ? "bold" : "normal",
    padding: 5,
    maxHeight: 50,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    cursor: "pointer",
    background: "#fff",
    transition: ".2s",
    fontSize: "1rem",

    ":hover": {
      background: "rgb(252, 237, 220)",
      transition: ".2s",
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 6,
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: 10,
    maxHeight: 180,
    width: 350,
    background: "#fff",

    "::-webkit-scrollbar": {
      width: 7,
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#bd5a31",
    },

    "::-webkit-scrollbar-track-piece": {
      background: "#fff",
      borderRadius: 10,
      marginTop: 2,
      marginBottom: 2,
    },
  }),

  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "rgb(252, 237, 220)",
    display: "flex",
    borderRadius: 4,
    margin: 2,
    marginRight: 4,
    paddingRight: 6,
    boxSizing: "border-box",
    position: "relative",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: primaryColor,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: primaryColor,
    fontSize: 20,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isSelected ? primaryColor : primaryColor,
    minHeight: "1px",
    paddingBottom: "2px",
  }),
};

export default SelectStyle1;
