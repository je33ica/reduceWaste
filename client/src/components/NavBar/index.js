import { Link /*useLocation*/ } from "react-router-dom";
import { useState } from "react"
import {
  fullNav,
  navList,
  navItem,
  navIconContainer,
  navIcons,
  navHeader,
} from "./nav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../icons/";
import NavIcon from "./NavIcon";
import Tooltip from "./NavIcon/Tooltip";

const NavBar = ({ navBarItems }) => {
  // const location = useLocation();

  const [displayTooltip, setTooltip] = useState(false)

  return (
    <nav className={fullNav}>
      <Link to="/" className={navIconContainer} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
        <FontAwesomeIcon className={navIcons} icon={icons.shoppingBasket} />
        <FontAwesomeIcon className={navIcons} icon={icons.utensils} />
        {displayTooltip && <Tooltip text={"Home"} />}
      </Link>
      <h1 className={navHeader}>Reduce Waste</h1>
      <ul className={navList}>
        {navBarItems.map((item) => {
          return (
            <li className={navItem} key={`${item.text}`}>
              <NavIcon text={item.text} path={item.path} icon={item.icon}/>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
