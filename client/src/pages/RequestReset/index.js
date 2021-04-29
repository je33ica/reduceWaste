import { useRef } from "react";
import NavBar from "../../components/NavBar";
import Reset from "../../components/Request";
import navbarIcons from "../../icons/navbarIcons";

const RequestReset = () => {

  const emailInput = useRef("");

  const requestResetHandler = (e) => {
    e.preventDefault()
    const enteredEmail = emailInput.current.value;
    console.log(enteredEmail)
  }

  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <Reset emailInput={emailInput} requestResetHandler={requestResetHandler}/>
    </>
  );
};

export default RequestReset;
