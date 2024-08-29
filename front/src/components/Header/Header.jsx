import "./Header.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("User from store:", user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getProfileLink = () => {
    if (user) {
      return `/profil/${user._id}`;
    }
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink to={"/"}>
          <img src="/vite.svg" alt="logo site et bouton retour main page" />
        </NavLink>
      </div>
      <ul className="navbar__menu">
        {user ? (
          <>
            <li className="navbar__menu-item">
              <NavLink
                className="navbar__menu-link"
                to={"/"}
                aria-label="Bouton de retour a la page principale"
                tabIndex={0}
              >
                Home
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink
                className="navbar__menu-link"
                to={getProfileLink()}
                aria-label="Bouton d'accès au profil utilisateur"
                tabIndex={0}
              >
                Profil
              </NavLink>
            </li>
            {user.status === "administrateur" && (
              <li className="navbar__menu-item">
                <NavLink
                  className="navbar__menu-link"
                  to={"/admin"}
                  aria-label="Bouton d'accès à la page admin"
                  tabIndex={0}
                >
                  Admin
                </NavLink>
              </li>
            )}
            <li className="navbar__menu-item">
              <NavLink
                className="navbar__menu-link"
                onClick={handleLogout}
                aria-label="Bouton de déconnexion"
                tabIndex={0}
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__menu-item">
              <NavLink
                className="navbar__menu-link"
                to={"/registration"}
                aria-label="Bouton d'inscription"
                tabIndex={0}
              >
                S'inscrire
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink
                className="navbar__menu-link"
                to={"/login"}
                aria-label="Bouton de connexion"
                tabIndex={0}
              >
                Connexion
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
