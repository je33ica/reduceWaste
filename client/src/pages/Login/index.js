import { useRef, useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";
import PopUpAlert from "../../components/PopUpAlert";
import Loading from "../../components/Loading";

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
            message: "Registration Successful! Redirecting to products page",
          });
          //use the useHistory hook from react-router to redirect the user once logged in successfully
          setTimeout(() => {
            history.push("/products");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const navBarItems = [{ path: "/registration", text: "Sign Up" }];

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
