import { useRef, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import userContext from "../../utils/context/userContext";
import NavBar from "../../components/NavBar";
import RegistrationForm from "../../components/RegistrationForm";
import PopUpAlert from "../../components/PopUpAlert";
import Loading from "../../components/Loading";

const Registration = () => {
  const emailInput = useRef("");
  const usernameInput = useRef("");
  const passwordInput = useRef("");
  const confirmPasswordInput = useRef("");

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [validationState, setValidationState] = useState({
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  });
  // we check, using context, if the user is logged in and if so we redirect them to the account page
  // the only way a logged in user would be able to access this page is by typing it direct in to the url
  //but we still wanted to guard against it
  const { isUserLoggedIn } = useContext(userContext);
  if (isUserLoggedIn) {
    return <Redirect to="/account" />;
  }
  const submitRegistrationHandler = (e) => {
    e.preventDefault();
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    const email = emailInput.current.value.trim();
    const username = usernameInput.current.value.trim();
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;
    let validationFailed = false;
    const tempValidationState = { ...validationState };

    if (!emailRegex.test(email) || email.length < 5) {
      tempValidationState.email = false;
      validationFailed = true;
    }
    if (username.length < 3) {
      tempValidationState.username = false;
      validationFailed = true;
    }
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
    const userData = {
      email,
      password,
      username,
      products: [],
    };
    setLoading(true);
    //submit the registration form
    fetch("/api/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setDisplayPopup({
          show: true,
          type: "success",
          message: "Registration Successful! Redirecting to login page",
        });
        setValidationState({
          email: true,
          username: true,
          password: true,
          confirmPassword: true,
        });
        setTimeout(() => {
          history.push("/login");
        }, 20000);
      })
      .catch((err) => console.log(err));
  };

  const navBarItems = [
    { path: "/login", text: "Login" },
    { path: "/registration", text: "Sign Up" },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <RegistrationForm
        emailInput={emailInput}
        usernameInput={usernameInput}
        passwordInput={passwordInput}
        confirmPasswordInput={confirmPasswordInput}
        submitRegistrationHandler={submitRegistrationHandler}
        validationState={validationState}
      />
      {loading && <Loading />}
      {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default Registration;
