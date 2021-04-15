import { useRef, useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  const emailInput = useRef("");
  const passwordInput = useRef("");

  const history = useHistory();

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

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => {
        setValidationState({
          email: true,
          password: true,
        });
        //use the useHistory hook from react-router to redirect the user once logged in successfully

        history.push("/account");
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
    </>
  );
};

export default Login;
