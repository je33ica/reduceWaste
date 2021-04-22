import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Link} from "react-router-dom"

const NavIcon = ({icon, text, path}) => {
  return (
    <>
    <Link to={path}>
      <FontAwesomeIcon icon={icon} />
    </Link>
    </>
  )
}

export default NavIcon