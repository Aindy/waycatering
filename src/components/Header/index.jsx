import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import styles from "./index.module.sass";

const Header = () => {
  const location = useLocation();

  return (
    <header className="wrapper">
      <div className={styles.header}>
        <Link to="/">
          <img src={logo} alt="Логотип" className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.link} ${
              location.pathname === "/" && !location.hash ? styles.active : ""
            }`}
          >
            Главная
          </Link>
          <Link
            to="/#portfolio"
            className={`${styles.link} ${
              location.hash === "#portfolio" ? styles.active : ""
            }`}
          >
            Портфолио
          </Link>
          <Link
            to="/catalogFood"
            className={`${styles.link} ${
              location.pathname === "/catalogFood" ? styles.active : ""
            }`}
          >
            Меню
          </Link>
          <Link
            to="/catalogDevice"
            className={`${styles.link} ${
              location.pathname === "/catalogDevice" ? styles.active : ""
            }`}
          >
            Аренда
          </Link>
          <Link
            to="/contacts"
            className={`${styles.link} ${
              location.pathname === "/contacts" ? styles.active : ""
            }`}
          >
            Контакты
          </Link>
        </nav>

        <a className={styles.button} href="tel:+79287391414">8 928 739 14 14</a>
      </div>
    </header>
  );
};

export default Header;
