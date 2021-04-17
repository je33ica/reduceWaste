import { useContext } from "react";
import { Redirect } from "react-router";
import NavBar from "../../components/NavBar";
import userContext from "../../utils/context/userContext";
import API from "../../utils/api";

const Receipts = () => {
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/products", text: "Sign Up" },
  ];
  // we check, using context, if the user is logged in and if so we redirect them to the account page
  // the only way a logged in user would be able to access this page is by typing it direct in to the url
  //but we still wanted to guard against it
  // further check - if the user gets to a page by typing in the address, we can lose the log in status of the user s
  // we add a quick check to the backend to see if the user is currently logged in
  const { isUserLoggedIn, setUserLogInStatus } = useContext(userContext);
  if (!isUserLoggedIn) {
    API.checkIfUserIsLoggedIn()
      .then((res) => res.json())
      .then((result) => {
        if (result.email) {
          setUserLogInStatus(true);
        } else {
          return <Redirect to="/" />;
        }
      });
  }
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1>Reduce Waste Receipt Uploader</h1>
      <p>
        Using the service below, you can upload scanned receipts and our
        Artificial Intelligence service will read the receipt for product
        information.
      </p>
      <p>
        Any products which match products you have saved before will be
        populated with the data stored in your database.
      </p>
      <small>
        Our AI service is constantly improving, however there may be some errors
        from reading the results. The form created below will be editable to
        allow you to correct any mistakes
      </small>
    </>
  );
};

export default Receipts;
