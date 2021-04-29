const Request = ({ emailInput, requestResetHandler }) => {
  return (
    <>
      <form className="form" onSubmit={requestResetHandler}>
        <h3>Request Password Reset</h3>
        <label htmlFor="email">Enter your email</label>
        <input type="email" name="email" ref={emailInput} />
        <button className="btn" type="submit">
          Send Request
        </button>
        <p style={{fontSize: "0.8rem", textAlign: "center", fontWeight: "lighter"}}>If your email is in our database, we will send you an email with a unique link to Request your email</p>
      </form>
    </>
  );
};

export default Request;