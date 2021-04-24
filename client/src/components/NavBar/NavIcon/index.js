import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import {Link} from "react-router-dom"
import {navIcon, holder} from "./navicon.module.scss"
import Tooltip from "./Tooltip"

const NavIcon = ({icon, text, path}) => {

  const [displayTooltip, setTooltip] = useState(false);

  if (path === "/logout"){
    return (
      <>
        <div className={navIcon}>
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