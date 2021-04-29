import TextAlert from "../TextAlert";

const Reset = ({ passwordInput, resetPasswordHandler, validationState, confirmPasswordInput }) => {
  return (
    <>
      <form className="form" onSubmit={resetPasswordHandler}>
        <h3>Reset Password</h3>
        <label htmlFor="password">Enter New Password</label>
        <input type="password" name="password" ref={passwordInput} />
        {!validationState.password && (
          <TextAlert
            type="form"
            message="Password must contain at least 1 Uppercase, 1 Lowercase, 1 numeric and 1 special character"
          />
        )}
        <label htmlFor="passwordConfirm">Confirm your new password</label>
        <input
          type="password"
          name="passwordConfirm"
          ref={confirmPasswordInput}
        />
        {!validationState.confirmPassword && (
          <TextAlert type="form" message="Passwords do not match!" />
        )}
        <button className="btn" type="submit">
          Reset Password
        </button>
      </form>
    </>
  );
};

export default Reset;
