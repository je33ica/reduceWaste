import { Link } from "react-router-dom";
import {menuCont, menuItem} from "./mobilenav.module.scss"

const Menu = ({ items }) => {
  return (
    <ul className={menuCont}>
      {items.map((item) => {
        return (
          <li className={menuItem} key={`${item.text}`}>
            <Link to = {item.path}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu
