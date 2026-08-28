import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.sass";
import logo from "../../assets/svg/whiteLogo.svg";
import insta from "../../assets/svg/instaLogo.svg";
import telegram from "../../assets/svg/tgLogo.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        {/* верхняя часть — логотип */}
        <div className={styles.top}>
          <Link to="/">
            <img src={logo} alt="WayCatering" className={styles.logo} />
          </Link>
        </div>

        {/* нижняя часть */}
        <div className={styles.bottom}>
          {/* соцсети для мобильной версии */}
          <div className={`${styles.socials} ${styles.mobile}`}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <img src={insta} alt="Instagram" />
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <img src={telegram} alt="Telegram" />
            </a>
          </div>

          <div className={styles.left}>
            <p>WAYCATERING © 2026</p>
            <Link to="/catalogFood">МЕНЮ</Link>
            <Link to="/catalogDevice">АРЕНДА</Link>
            <Link to="/contacts">О НАС</Link>
          </div>

          <div className={`${styles.socials} ${styles.desctop}`}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <img src={insta} alt="Instagram" />
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <img src={telegram} alt="Telegram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
