import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import navbarIcons from "../../../icons/navbarIcons"
import menuContext from "../../../utils/context/menuContext";
import Menu from "./Menu";
import {mobileNav} from "./mobilenav.module.scss"

const MobileNav = ({ items }) => {
  // const [displayMenu, setDisplayMenu] = useState(false);
  const {displayMenu, toggleMenu} = useContext(menuContext);

  return (
    <div className={mobileNav} onClick={() => toggleMenu(!displayMenu)}>
      <FontAwesomeIcon icon={navbarIcons.bars} />
      {displayMenu &&  <Menu items={items}/>}
    </div>
  );
};

export default MobileNav