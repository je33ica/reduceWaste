import NavBar from "../../components/NavBar";
import Landing from "../../components/Landing";
import navbarIcons from "../../icons/navbarIcons"
import { useContext, useEffect } from "react";
import NavbarContext from "../../utils/context/navbarContext";

const Home = () => {
  const {updateNavbarItems}= useContext(NavbarContext);
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  useEffect(() => {
    updateNavbarItems(navBarItems)
  }, [])
  
  return (
    <>
      <Landing />
    </>
  );
};

export default Home;
