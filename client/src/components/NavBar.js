import { Link, useLocation } from "react-router-dom";

const NavBar = ({ navBarItems }) => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        {navBarItems.map((item) => {
          return (
            <li key={`${item.text}`}>
              <Link to={item.path}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
