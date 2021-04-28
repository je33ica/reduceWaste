import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
import MobileNav from "./MobileNav";
import navbarIcons from "../../icons/navbarIcons";
import NavbarContext from "../../utils/context/navbarContext";

const NavBar = () => {
  const navbarCtx = useContext(NavbarContext);

  const [displayTooltip, setTooltip] = useState(false);
  const isSmallerScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const logoutItem = {
    path: "/logout",
    text: "Logout",
    icon: navbarIcons.logout,
  };

  const itemsWithLogout = [...navbarCtx.navbarItems, logoutItem];
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/login") {
    itemsWithLogout.pop();
  }

  return (
    <nav className={fullNav}>
      <Link
        to="/"
        className={navIconContainer}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        <FontAwesomeIcon className={navIcons} icon={icons.shoppingBasket} />
        <FontAwesomeIcon className={navIcons} icon={icons.utensils} />
        {displayTooltip && <Tooltip text={"Home"} />}
      </Link>
      <Link to="/">
        <h1 className={navHeader}>Reduce Waste</h1>
      </Link>
      <ul className={navList}>
        {isSmallerScreen ? (
          <MobileNav items={itemsWithLogout} />
        ) : (
          itemsWithLogout.map((item) => {
            return (
              <li className={navItem} key={`${item.text}`}>
                <NavIcon text={item.text} path={item.path} icon={item.icon} />
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
