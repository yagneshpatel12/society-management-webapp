import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./textAnimation.css";
import Styles from "./HeroSection.module.css";
import anime from "animejs/lib/anime.min.js";
import { useGlobalContext } from "../../../context/context";
const HeroSection = () => {
  const {isAuth}=useGlobalContext();
  useEffect(() => {
    var textWrapper = document.querySelector(".hero-heading .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline({ loop: false }).add({
      targets: ".hero-heading .letter",
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 70 * i,
    });
  },[]);

  return (
    <div className={`${Styles.heroWrapper} container`}>
      <div className={Styles.rightSide}>
        <h1 className="hero-heading">
          <span className="text-wrapper">
            <span className="letters">DIGITAL &nbsp;SOCIETY</span>
          </span>
        </h1>
        <h3>
          Visnagar's <span style={{ color: "var(--thirdary-color)" }}>Top </span>
          Society
        </h3>
        <p>
         where we can live with nature
and lots of space. 24 x 7 security like camera , guard , fancing. 
digital society is known as green city of visnagar.        </p>
        <button className={`btnStructure ${Styles.btn}`}>
          <span><Link to='/register'>{!isAuth ?'REGISTER YOUR FAMILY':'GO TO PROFILE'}</Link></span>
          <div>
            <img src="./images/icons/arrow.svg" alt="" />
          </div>
        </button>
      </div>
      <div className={Styles.leftSide}>
        <img
          src="./images/img/house.webp"
          data-aos="fade-down"
          className={Styles.houseImg}
          alt=""
        />
        <img
          src="./images/img/residency.webp"
          data-aos="fade-left"
          className={Styles.residencyImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroSection;
