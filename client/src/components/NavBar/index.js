import { Link /*useLocation*/ } from "react-router-dom";
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

const NavBar = ({ navBarItems }) => {
  // const location = useLocation();

  return (
    <nav className={fullNav}>
      <Link to="/" className={navIconContainer}>
        <FontAwesomeIcon className={navIcons} icon={icons.shoppingBasket} />
        <FontAwesomeIcon className={navIcons} icon={icons.utensils} />
      </Link>
      <h1 className={navHeader}>Reduce Waste</h1>
      <ul className={navList}>
        {navBarItems.map((item) => {
          return (
            <li className={navItem} key={`${item.text}`}>
              <Link to={item.path}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
