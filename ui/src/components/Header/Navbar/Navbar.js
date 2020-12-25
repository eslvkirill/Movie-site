import React from "react";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../../../containers/UserContext/UserContext";
import axios from "axios";
import "./Navbar.scss";

const Navbar = () => {
  const [user, setUser] = useUserAuth();

  const links = [
    user !== null && {
      to: "/",
      label: user.username,
      visible: false,
    },
    // { to: "/myFilms", label: "Мои фильмы", visible: true },
    user !== null && {
      to: "/adminPanel/charts",
      label: "Панель администратора",
      visible: false,
    },
    user !== null && {
      to: "/orders",
      label: "Заказы",
      visible: true,
    },
    user !== null && { to: "/shoppingCart", label: "Корзина", visible: true },

    user !== null
      ? { to: "/logout", label: "➤  Выйти", visible: false }
      : { to: "/login", label: "➤  Войти", visible: true },
  ];

  const renderLinks = () => {
    return links.map((link, index) => {
      if (user !== null) {
        link.visible = true;
        if (user.role === "USER")
          if (link.to === "/adminPanel/charts") link.visible = false;
      }

      if (link.visible) {
        return (
          <li key={index}>
            <NavLink
              activeClassName="active"
              className="link"
              to={link.to === "/logout" ? "/" : link.to}
              style={
                link.to === "/shoppingCart"
                  ? { position: "relative", bottom: 6.5 }
                  : link.to === "/login"
                  ? {
                      backgroundColor: "#318600",
                      boxShadow: "1px 5px 10px -5px black",
                      borderRadius: "10px 0 0 10px",
                    }
                  : link.to === "/logout"
                  ? {
                      backgroundColor: "#ac1a00",
                      boxShadow: "1px 5px 10px -5px black",
                      borderRadius: "10px 0 0 10px",
                    }
                  : link.to === "/"
                  ? {
                      textTransform: "none",
                      backgroundColor: "#b101b1",
                      borderRadius: "50% 30% / 10% 30%",
                      boxShadow: "1px 5px 10px -5px black",
                    }
                  : {}
              }
              onClick={
                link.to === "/logout"
                  ? async () => {
                      try {
                        await axios.get("/logout").then(() => setUser(null));
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  : null
              }
            >
              {link.label === "Корзина" ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    viewBox="0 0 226 226"
                    style={{
                      fill: "#000000",
                      fontWeight: "bold",
                      marginRight: 5,
                      marginBottom: 2,
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <g
                      fill="none"
                      fillRule="nonzero"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <path d="M0,226v-226h226v226z" fill="none"></path>
                      <g fill="#fceddc">
                        <path d="M15.89063,19.42188c-3.00156,0 -5.29687,2.29531 -5.29687,5.29688c0,3.00156 2.29531,5.29688 5.29688,5.29688h12.35938v91.8125c0,3.00156 2.29531,5.29688 5.29688,5.29688c3.00156,0 5.29688,-2.29531 5.29688,-5.29687v-74.15625h154.14044c2.29531,0 4.41269,1.058 5.64862,3.00018c1.4125,1.94219 1.76563,4.24026 0.88281,6.35901l-24.18768,72.74237c-2.64844,7.94531 -9.88819,13.24219 -18.36319,13.24219h-111.0585c-9.71094,0 -17.65625,7.94531 -17.65625,17.65625c0,9.71094 7.94531,17.65625 17.65625,17.65625h83.86719c6.35625,0 11.47656,5.12031 11.47656,11.47656c0,3.00156 2.29531,5.29688 5.29688,5.29688c3.00156,0 5.29688,-2.29531 5.29688,-5.29687c0,-12.18281 -9.8875,-22.07031 -22.07031,-22.07031h-83.86719c-3.88437,0 -7.0625,-3.17812 -7.0625,-7.0625c0,-3.88438 3.17813,-7.0625 7.0625,-7.0625h111.0585c12.88906,0 24.36493,-8.29775 28.42587,-20.48056l24.18769,-72.74582c1.76563,-5.47344 0.88557,-11.3 -2.46912,-15.89062c-3.35469,-4.59062 -8.65432,-7.41425 -14.30432,-7.41425h-153.96112v-12.35937c0,-3.00156 -2.29531,-5.29687 -5.29687,-5.29687zM45.90625,188.92188c-9.71094,0 -17.65625,7.94531 -17.65625,17.65625c0,9.71094 7.94531,17.65625 17.65625,17.65625c9.71094,0 17.65625,-7.94531 17.65625,-17.65625c0,-9.71094 -7.94531,-17.65625 -17.65625,-17.65625zM125.46973,192.45313c-1.34629,0 -2.67051,0.53038 -3.6416,1.58975c-3.35469,3.35469 -5.121,7.76806 -5.121,12.53525c0,9.71094 7.94531,17.65625 17.65625,17.65625c9.71094,0 17.65625,-7.94531 17.65625,-17.65625c0,-3.00156 -2.29531,-5.29687 -5.29687,-5.29687c-3.00156,0 -5.29687,2.29531 -5.29687,5.29688c0,3.88438 -3.17812,7.0625 -7.0625,7.0625c-3.88438,0 -7.0625,-3.17812 -7.0625,-7.0625c0,-1.94219 0.70832,-3.70919 2.12082,-4.94513c1.76563,-2.11875 1.76287,-5.47137 -0.17932,-7.59012c-1.05937,-1.05938 -2.42636,-1.58975 -3.77264,-1.58975zM45.90625,199.51563c3.88437,0 7.0625,3.17812 7.0625,7.0625c0,3.88438 -3.17813,7.0625 -7.0625,7.0625c-3.88437,0 -7.0625,-3.17812 -7.0625,-7.0625c0,-3.88438 3.17813,-7.0625 7.0625,-7.0625z"></path>
                      </g>
                    </g>
                  </svg>
                  {link.label}
                </span>
              ) : (
                link.label
              )}
            </NavLink>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <nav className="Navbar">
      <ul>{renderLinks()}</ul>
    </nav>
  );
};

export default Navbar;
