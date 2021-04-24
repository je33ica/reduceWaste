import NavBar from "../../components/NavBar";
import Landing from "../../components/Landing";
import navbarIcons from "../../icons/navbarIcons"

const NoMatch = () => {
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1 style={{textAlign: "center"}}>Hmm 🤔. We couldn't find that page sorry.</h1>
    </>
  );
};

export default NoMatch;
