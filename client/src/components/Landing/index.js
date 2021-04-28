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
          <p>
            Use our recipe finder! Easily find great recipe ideas from
            ingredients in your kitchen
          </p>
        </div>

        <div className={card}>
          <img src={store} alt="store" className={landingImg} />
          <p>
            Never waste food again! Our colour coded system helps you easily
            identify what needs to be used
          </p>
        </div>

        <div className={card}>
          <img src={handwrite} alt="store" className={landingImg} />
          <p>
            Use our AI services! Scan shopping lists &amp; receipts or scan
            barcodes to add to your store cupboard
          </p>
        </div>
        <div className={card}>
          <img src={add} alt="store" className={landingImg} />
          <p>
            Easily add items! Enter product information, save details such as
            product type &amp; amount{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
