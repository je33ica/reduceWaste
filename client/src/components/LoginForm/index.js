// NavBar
// need form
// form needs Valid email adress -
// password input
// login handler > form validation, prevent unesecary calls to DB
// if already logged in then redirect to account - useContext and set Context as logged in
// once successful login redirect to account page

import { Link } from "react-router-dom";

const LoginForm = ({ emailInput, passwordInput, loginHandler }) => {
  return (
    <>
      <form className="form" onSubmit={loginHandler}>
        <h3>Login</h3>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={emailInput} />
        {/* {!validationState.email && (
          <TextAlert type="form" message="Invalid email" />
        )} */}

        <label htmlFor="password">Password</label>
        <input type="password" name="password" ref={passwordInput} />
        {/* {!validationState.password && (
          <TextAlert
            type="form"
            message="Password must contain at least 1 Uppercase, 1 Lowercase, 1 numeric and 1 special character"
          />
        )} */}

        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <p style={{ textAlign: "center" }}>
        Not registered?{" "}
        <Link className="inlineLink" to="/registration">
          Click here to register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
