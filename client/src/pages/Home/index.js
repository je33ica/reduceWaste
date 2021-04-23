import NavBar from "../../components/NavBar";
import Landing from "../../components/Landing";
import navbarIcons from "../../icons/navbarIcons"

const Home = () => {
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      {/* left hand side is the prop name- right is value */}
      <NavBar navBarItems={navBarItems} />
      <Landing />
    </>
  );
};

export default Home;
