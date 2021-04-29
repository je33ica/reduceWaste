import { useLocation } from "react-router";
import NavBar from "../../components/NavBar";
import navbarIcons from "../../icons/navbarIcons";

const PasswordReset = () => {
  const location = useLocation();
  const parseQueryString = (query) => {
    const withOutToken = query.replace("?token=", "");
    const withoutId = withOutToken.replace("id=", "");
    const paramArr = withoutId.split("&");
    return {
      token: paramArr[0],
      hashId: paramArr[1]
    }
  }

  const {token, hashId} = parseQueryString(location.search);
  const navBarItems = [
    { path: "/login", text: "Login", icon: navbarIcons.login },
    { path: "/registration", text: "Sign Up", icon: navbarIcons.signup },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1 style={{textAlign: "center"}}>Password reset page</h1>
    </>
  );
};

export default PasswordReset;
