import { useRef, useState, useContext } from "react";
import { useHistory, Redirect } from "react-router";
import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";
import PopUpAlert from "../../components/PopUpAlert";
import Loading from "../../components/Loading";
import userContext from "../../utils/context/userContext";
import API from "../../utils/api";
import navbarIcons from "../../icons/navbarIcons";

const Login = () => {
  const emailInput = useRef("");
  const passwordInput = useRef("");

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [validationState, setValidationState] = useState({
    email: true,
    password: true,
  });
  // we check, using context, if the user is logged in and if so we redirect them to the account page
  // the only way a logged in user would be able to access this page is by typing it direct in to the url
  //but we still wanted to guard against it
  const { isUserLoggedIn, setUserLogInStatus } = useContext(userContext);

  // further check - if the user gets to a page by typing in the address, we can lose the log in status of the user s
  // we add a quick check to the backend to see if the user is currently logged in


  if (isUserLoggedIn) {
    return <Redirect to="/products" />;
  }
  const loginHandler = (e) => {
    e.preventDefault();
    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();
    let validationFailed = false;
    const tempValidationState = { ...validationState };

    if (email.length < 1) {
      tempValidationState.email = false;
      validationFailed = true;
    }
    if (password.length < 1) {
      tempValidationState.password = false;
      validationFailed = true;
    }

    setValidationState(tempValidationState);
    if (validationFailed) {
      return;
    }

    const userData = {
      email,
      password,
    };
    setLoading(true);

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.message) {
          setDisplayPopup({
            show: true,
            type: "failure",
            message: result.message,
          });
        } else {
          setValidationState({
            email: true,
            password: true,
          });
          setDisplayPopup({
            show: true,
            type: "success",
            message: "Login Successful! Redirecting to products page",
          });
          //use the useHistory hook from react-router to redirect the user once logged in successfully
          setTimeout(() => {
            history.push("/account");
            setUserLogInStatus(true);
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const navBarItems = [{ path: "/registration", text: "Sign Up", icon: navbarIcons.signup }];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <LoginForm
        emailInput={emailInput}
        passwordInput={passwordInput}
        loginHandler={loginHandler}
      />
      {loading && <Loading />}
      {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default Login;
