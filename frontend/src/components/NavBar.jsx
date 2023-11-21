import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function NavBar() {
  const { authenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-header position-sticky top-0 z-3">
      <div className="container">
        <NavLink
          to="/"
          className="text-decoration-none text-white d-flex align-items-center"
        >
          <span className="ms-2">JURNALUL PERSONAL</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">
                Acasa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/postari"
                activeclassname="active"
                className="nav-link"
              >
                Postari
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                activeclassname="active"
                className="nav-link"
              >
                Contact
              </NavLink>
            </li>

            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/mylogin"
                  activeclassname="active"
                  className="nav-link"
                >
                  Autentificare
                </NavLink>
              </li>
            )}
            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/myregister"
                  activeclassname="active"
                  className="nav-link"
                >
                  Inregistrare
                </NavLink>
              </li>
            )}

            {authenticated && (
              <li className="nav-item dropdown">
                <button className="dropbtn">Admin</button>
                <div className="dropdown-content">
                  <NavLink
                    to="/admin/adauga-articol"
                    activeclassname="active"
                    className="nav-link"
                  >
                    Adauga articol
                  </NavLink>

                  <NavLink
                    to="/admin/utilizatori"
                    activeclassname="active"
                    className="nav-link"
                  >
                    Utilizatori
                  </NavLink>
                </div>
              </li>
            )}
            {authenticated && (
              <li className="nav-item">
                <NavLink
                  activeclassname="aaa"
                  onClick={logout}
                  className="nav-link"
                  to="/"
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
