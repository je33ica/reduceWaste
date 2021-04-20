import placeholder from "../../assets/images/placeholder.png";
import {landingImg} from "./landing.module.scss";
import {Link} from "react-router-dom"

const Landing = () => {
  
  return (
    <div className="grid">
      <img src={placeholder} alt="placeholder" className={landingImg}/>
      <div>
        <p>An application designed to track your food items, to help you reduce waste.</p>
        <p>Designed for restaurants and home cooks, we offer a range of smart solutions for managing your produce.</p>
        <p><big>Its good for the planet 🌎 Its good for your wallet 💵</big></p>
        <div style={{width: "90%", textAlign: "center"}}>
        <Link to="/registration" className="inlineLink">Register for an account today!</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing