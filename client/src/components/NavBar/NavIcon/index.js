import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useContext } from "react"
import {Link, useHistory} from "react-router-dom"
import {navIcon, holder} from "./navicon.module.scss"
import Tooltip from "./Tooltip";
import userContext from "../../../utils/context/userContext";
import API from "../../../utils/api"
import PopUpAlert from "../../PopUpAlert";


const NavIcon = ({icon, text, path}) => {

  const [displayTooltip, setTooltip] = useState(false);
  const history = useHistory();
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const {setUserLogInStatus} = useContext(userContext);

  const logout = () => {
    API.userLogout().then(() => {
      setDisplayPopup({
        show: true,
        type: "success",
        message: "Logout Successful! Redirecting...",
      });
      setTimeout(() => {
        setUserLogInStatus(false);
        history.replace("/");
        setDisplayPopup({
          show: false,
          type: "",
          message: "",
        });
      }, 500);

    });
  }

  if (path === "/logout"){
    return (
      <>
        <div className={navIcon} onClick={logout} style={{cursor: "pointer"}}>
          <div className={holder} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
          <FontAwesomeIcon icon={icon} />
          {displayTooltip && <Tooltip text={text}/>}
        </div>
      </div>
      {/* {displayPopup.show && <div style={{position: "fixed", height: "100vh", width: "100vw"}}>
      <PopUpAlert type={displayPopup.type} message={displayPopup.message}
      />
      </div>} */}
      </>
    )
  }

  return (
    <>
    <Link to={path}>
      <div className={navIcon}>
        <div className={holder} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
        <FontAwesomeIcon icon={icon} />
        {displayTooltip && <Tooltip text={text}/>}
        </div>
      </div>
    </Link>
    </>
  )
}

export default NavIcon