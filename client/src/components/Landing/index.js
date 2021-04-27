import recipes from "../../assets/images/recipes.png";
import handwrite from "../../assets/images/handwrite.png";
import store from "../../assets/images/store.png";
import add from "../../assets/images/add.png";
import {
  grid,
  landingImg,
  landingImgSecond,
  landingImgThird,
  card,
  text,
} from "./landing.module.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className={text}>
        <p>Designed to track your food items & help you reduce waste.</p>
        <p>
          A range of smart solutions to manage produce, for restaurants & home
          cooks.
        </p>
        <p>
          <big>It's good for the planet 🌎 It's good for your wallet 💵</big>
        </p>

        <div>
          <Link to="/registration" className="inlineLink">
            Register for an account today!
          </Link>
        </div>
      </div>
      <div className={grid}>
        <div className={card}>
          <img src={recipes} alt="recipe" className={landingImg} />
          <p>Easily find recipes from ingredients in your kitchen</p>
        </div>

        <div className={card}>
          <img src={store} alt="store" className={landingImgSecond} />
          <p>
            Never waste food again! Our colour coded system helps you easily
            identify what needs to be used
          </p>
        </div>
        <div className={card}>
          <img src={handwrite} alt="store" className={landingImgThird} />
          <p>Use Shopping lists & receipts to add to your store cupboard</p>
        </div>
        <div className={card}>
          <img src={add} alt="store" className={landingImgThird} />
          <p>Easily item items </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
