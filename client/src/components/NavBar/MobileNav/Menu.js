import { Link } from "react-router-dom";

const Menu = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li className="" key={`${item.text}`}>
            <Link to = {item.path}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu
