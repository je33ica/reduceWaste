const Reset = ({ emailInput, requestResetHandler }) => {
  return (
    <>
      <form className="form" onSubmit={requestResetHandler}>
        <h3>Login</h3>
        <label htmlFor="email">Enter your email</label>
        <input type="email" name="email" ref={emailInput} />
        <button className="btn" type="submit">
          Request Reset
        </button>
        <p style={{fontSize: "0.8rem", textAlign: "center", fontWeight: "lighter"}}>If your email is in our database, we will send you an email with a unique link to reset your email</p>
      </form>
    </>
  );
};

export default Reset;