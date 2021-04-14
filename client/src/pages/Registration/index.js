import {useRef, useState} from "react"
import NavBar from "../../components/NavBar";
import RegistrationForm from "../../components/RegistrationForm";

const Registration = () => {
  
  const emailInput = useRef("");
  const usernameInput = useRef("");
  const passwordInput = useRef("");
  const confirmPasswordInput = useRef("");

  const [validationState, setValidationState] = useState({
    email: true,
    username: true,
    password: true,
    confirmPassword: true
  })


  const submitRegistrationHandler = e => {
    e.preventDefault();
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const email = emailInput.current.value.trim();
    const username = usernameInput.current.value.trim();
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;
    let validationFailed = false;
    const tempValidationState = {...validationState}

    if(!emailRegex.test(email) || email.length < 5){
      //set some state to alert the user that email was not valid
      tempValidationState.email = false;
      validationFailed = true;
    }

    if (username.length < 3){
      //set some state to alert the user that the username was not valid
      tempValidationState.username = false;
      validationFailed = true;
    }

    if (password.length < 7){
      //set some state to alert the user that the password should be 8 or more
      tempValidationState.password = false;
      validationFailed = true;
    }

    if (password !== confirmPassword){
      //set some state to alert the user that the passwords did not match
      tempValidationState.confirmPassword= false;
      validationFailed = true;
    }

    setValidationState(tempValidationState)

    if (validationFailed){
      return;
    }

    const userData = {
      email,
      password,
      username,
      products: []
    }

    //submit the registration form
    fetch("/api/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json()).then(result => console.log(result))

  }

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
      />
    </>
  );
};

export default Registration;
