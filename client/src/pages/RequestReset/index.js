import { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Reset from "../../components/Request";
import navbarIcons from "../../icons/navbarIcons";
import API from "../../utils/api";

const RequestReset = () => {
  const [outputResponse, setOutputResponse] = useState(null);

  const emailInput = useRef("");

  const requestResetHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    API.requestPasswordReset(enteredEmail).then((res) => {
      console.log(res);
      if (res.status === 400) {
        //set state to display error message
        setOutputResponse("That email address wasn't recognised");
      } else {
        setOutputResponse(
          "An email containing a unique link to reset your password should be in your inbox (it may be in your junk)"
        );
      }
    });
  };

  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <Reset
        emailInput={emailInput}
        requestResetHandler={requestResetHandler}
      />
      {outputResponse && (
        <div
          style={{
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <p>{outputResponse}</p>
        </div>
      )}
    </>
  );
};

export default RequestReset;
