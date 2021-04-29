import { useRef, useState } from "react";
import { Redirect, useLocation } from "react-router";
import NavBar from "../../components/NavBar";
import Reset from "../../components/Reset";
import navbarIcons from "../../icons/navbarIcons";

const PasswordReset = () => {
  const location = useLocation();
  const passwordInput = useRef("");
  const confirmPasswordInput = useRef("");
  const [validationState, setValidationState] = useState({
    password: true,
    confirmPassword: true,
  });

  const parseQueryString = (query) => {
    const withOutToken = query.replace("?token=", "");
    const withoutId = withOutToken.replace("id=", "");
    const paramArr = withoutId.split("&");
    return {
      token: paramArr[0],
      hashId: paramArr[1],
    };
  };

  const { token, hashId } = parseQueryString(location.search);

  // if (!token || !hashId){
  //   return (
  //     <Redirect to="/" />
  //   )
  // }

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;
    let validationFailed = false;
    const tempValidationState = { ...validationState };

    if (!passwordRegex.test(password)) {
      tempValidationState.password = false;
      validationFailed = true;
    }
    if (password !== confirmPassword) {
      tempValidationState.confirmPassword = false;
      validationFailed = true;
    }
    setValidationState(tempValidationState);
    if (validationFailed) {
      return;
    }
  };
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <Reset
        passwordInput={passwordInput}
        confirmPasswordInput={confirmPasswordInput}
        resetPasswordHandler={resetPasswordHandler}
        validationState={validationState}
      />
    </>
  );
};

export default PasswordReset;
