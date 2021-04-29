import NavBar from "../../components/NavBar";
import navbarIcons from "../../icons/navbarIcons";

const RequestReset = () => {

  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1 style={{textAlign: "center"}}>Request Reset</h1>
    </>
  );
};

export default RequestReset;
