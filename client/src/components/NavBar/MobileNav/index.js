import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import navbarIcons from "../../../icons/navbarIcons"
import Menu from "./Menu";
import {mobileNav} from "./mobilenav.module.scss"

const MobileNav = ({ items }) => {
  const [displayMenu, setDisplayMenu] = useState(true);

  return (
    <div className={mobileNav}>
      <FontAwesomeIcon icon={navbarIcons.bars} />
      {displayMenu &&  <Menu items={items}/>}
    </div>
  );
};

export default MobileNav