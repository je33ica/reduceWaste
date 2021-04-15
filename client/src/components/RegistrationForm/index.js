import { Link } from "react-router-dom";

const RegistrationForm = ({
  emailInput,
  usernameInput,
  passwordInput,
  confirmPasswordInput,
  submitRegistrationHandler,
}) => {
  return (
    <>
      <form onSubmit={submitRegistrationHandler}>
        <h3>Register</h3>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={emailInput} />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" ref={usernameInput} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" ref={passwordInput} />
        <label htmlFor="passwordConfirm">Confirm your password</label>
        <input
          type="password"
          name="passwordConfirm"
          ref={confirmPasswordInput}
        />
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
