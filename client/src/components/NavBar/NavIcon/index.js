import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useContext } from "react"
import {Link, useHistory} from "react-router-dom"
import {navIcon, holder} from "./navicon.module.scss"
import Tooltip from "./Tooltip";
import userContext from "../../../utils/context/userContext";
import API from "../../../utils/api"


const NavIcon = ({icon, text, path}) => {

  const [displayTooltip, setTooltip] = useState(false);
  const history = useHistory()

  const {setUserLogInStatus} = useContext(userContext);

  const logout = () => {
    API.userLogout().then(() => {
      setUserLogInStatus(false)
      history.replace("/")
    });
  }

  if (path === "/logout"){
    return (
      <>
        <div className={navIcon} onClick={logout}>
          <div className={holder} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
          <FontAwesomeIcon icon={icon} />
          {displayTooltip && <Tooltip text={text}/>}
        </div>
      </div>
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