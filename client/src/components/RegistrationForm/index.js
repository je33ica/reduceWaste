import { Link } from "react-router-dom";
import TextAlert from "../TextAlert";

const RegistrationForm = ({
  emailInput,
  usernameInput,
  passwordInput,
  confirmPasswordInput,
  submitRegistrationHandler,
  validationState,
}) => {
  return (
    <>
      <form onSubmit={submitRegistrationHandler}>
        <h3>Register</h3>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={emailInput} />
        {!validationState.email && (
          <TextAlert type="form" message="Invalid email" />
        )}
        <label htmlFor="username">Username</label>
        <input type="text" name="username" ref={usernameInput} />
        {!validationState.username && (
          <TextAlert type="form" message="Invalid username" />
        )}
        <label htmlFor="password">Password</label>
        <input type="password" name="password" ref={passwordInput} />
        {!validationState.password && (
          <TextAlert
            type="form"
            message="Password must contain at least 1 Uppercase, 1 Lowercase, 1 numeric and 1 special character"
          />
        )}
        <label htmlFor="passwordConfirm">Confirm your password</label>
        <input
          type="password"
          name="passwordConfirm"
          ref={confirmPasswordInput}
        />
        {!validationState.confirmPassword && (
          <TextAlert type="form" message="Passwords do not match!" />
        )}
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <p style={{ textAlign: "center" }}>
        Already registered?{" "}
        <Link className="inlineLink" to="/login">
          Click here to login
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
