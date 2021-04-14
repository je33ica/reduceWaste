const RegistrationForm = ({emailInput, usernameInput, passwordInput, confirmPasswordInput, submitRegistrationHandler}) => {
  return (
    <form onSubmit={submitRegistrationHandler}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="Enter your email" ref={emailInput}/>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" placeholder="Enter your username" ref={usernameInput} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="Enter your password" ref={passwordInput} />
      <label htmlFor="passwordConfirm">Confirm your password</label>
      <input type="password" name="passwordConfirm" placeholder="Please re-enter your password" ref={confirmPasswordInput}/>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm