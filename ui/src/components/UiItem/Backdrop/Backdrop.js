import React from "react";
import MaterialUIBackdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../components/Auth/Auth";
import "./Backdrop.scss";

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 50,
    background: "linear-gradient(200deg, #280138e3, #382201b0)",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
  },
}));

const Backdrop = (props) => {
  const classes = useStyles();
  const handleClose = () => props.setAuthForm(false);

  return (
    <div className="backdropWrapper">
      <MaterialUIBackdrop
        open={props.authForm}
        className={`${classes.backdrop}`}
        onClick={handleClose}
      ></MaterialUIBackdrop>
      <Auth className="auth" />
    </div>
  );
};

export default Backdrop;
