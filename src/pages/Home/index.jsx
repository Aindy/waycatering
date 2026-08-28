import React from "react";
import About from "./About";
import Menu from "./Menu";
import Portfolio from "./Portfolio";
import ContactForm from "../../components/ContactForm";
import styles from "./index.module.sass";
import img from "../../assets/img/home/img6.jpg";

const Home = () => {
  return (
    <div>
      <About />
      <Menu />
      <div className="wrapper">
        <div className={styles.divider}></div>
      </div>
      <Portfolio />
      <ContactForm img={img} />
    </div>
  );
};

export default Home;
