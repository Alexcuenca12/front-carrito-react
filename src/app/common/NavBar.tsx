import React from "react";
import "../styles/NavbarHome.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const eliminarUser = () => {
    sessionStorage.removeItem("user");
  };
  const { totalCount } = useSelector((state: any) => state?.cart);
  return (
    <>
      <div>
        <body className="body2">
          <nav>
            <div className="icon_digital"></div>
            <div id="logo">DIGITAL & TECH</div>
            <label htmlFor="drop" className="toggle">
              Menu
            </label>
            <input type="checkbox" id="drop" />
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/home"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/product"
                >
                  PRODUCT
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/category"
                >
                  CATEGORY
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/catalogue"
                >
                  CATALOGUE
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/person"
                >
                  PERSON
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/rol"
                >
                  ROL
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/user"
                >
                  USER
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/cart"
                >
                  SHOPPING CAR {totalCount}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/cartList"
                >
                  HISTORY
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ls-1 text-uppercase fw-6 fs-22"
                  to="/inicio"
                  onClick={eliminarUser}
                >
                  LOG OUT
                </Link>
              </li>
            </ul>
          </nav>
        </body>
      </div>
    </>
  );
};
