import addCard from "../../assets/images/addCard.png";
import hand from "../../assets/images/hand.png";
import foodStore from "../../assets/images/foodStore.png";
import recipe from "../../assets/images/recipe.png";
import { grid, landingImg, card, text } from "./landing.module.scss";
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
          <img src={recipe} alt="recipe" className={landingImg} />
          <p>
            Use our recipe finder! Easily find great recipe ideas from
            ingredients in your kitchen
          </p>
        </div>

        <div className={card}>
          <img src={foodStore} alt="store" className={landingImg} />
          <p>
            Never waste food again! Our colour coded system helps you easily
            identify what needs to be used
          </p>
        </div>

        <div className={card}>
          <img src={hand} alt="store" className={landingImg} />
          <p>
            Use our AI services! Scan shopping lists &amp; receipts or scan
            barcodes to add to your store cupboard
          </p>
        </div>
        <div className={card}>
          <img src={addCard} alt="store" className={landingImg} />
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
