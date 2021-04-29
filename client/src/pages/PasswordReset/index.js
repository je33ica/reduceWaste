import { useRef, useState } from "react";
import { Redirect, useLocation, useHistory } from "react-router";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import PopUpAlert from "../../components/PopUpAlert";
import Reset from "../../components/Reset";
import navbarIcons from "../../icons/navbarIcons";
import API from "../../utils/api";

const PasswordReset = () => {
  const location = useLocation();
  const passwordInput = useRef("");
  const confirmPasswordInput = useRef("");
  const [validationState, setValidationState] = useState({
    password: true,
    confirmPassword: true,
  });
  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const history = useHistory();

  const parseQueryString = (query) => {
    const withOutToken = query.replace("?token=", "");
    const withoutId = withOutToken.replace("id=", "");
    const paramArr = withoutId.split("&");
    return {
      token: paramArr[0],
      userId: paramArr[1],
    };
  };

  const { token, userId } = parseQueryString(location.search);

  if (!token || !userId) {
    return <Redirect to="/" />;
  }

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;
    let validationFailed = false;
    const tempValidationState = { ...validationState };

    if (!passwordRegex.test(password)) {
      tempValidationState.password = false;
      validationFailed = true;
    }
    if (password !== confirmPassword) {
      tempValidationState.confirmPassword = false;
      validationFailed = true;
    }
    setValidationState(tempValidationState);
    if (validationFailed) {
      return;
    }

    setLoading(true);

    API.resetPassword(userId, token, password).then((res) => {
      if (res.status === 200) {
        setDisplayPopup({
          type: "success",
          message: "Password reset, redirecting to login page",
          show: true,
        });
        setTimeout(() => {
          history.replace("/login");
          setDisplayPopup({
            show: false,
          });
        }, 1500);
      } else {
        setDisplayPopup({
          type: "failure",
          message: "Could not reset password. Please try again later",
          show: true,
        });
        setTimeout(() => {
          setDisplayPopup({
            show: false,
          });
        }, 1500);
      }
    });
  };
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <Reset
        passwordInput={passwordInput}
        confirmPasswordInput={confirmPasswordInput}
        resetPasswordHandler={resetPasswordHandler}
        validationState={validationState}
      />
      {loading && <Loading />}
      {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default PasswordReset;
