import { Redirect } from "react-router";
import NavBar from "../../components/NavBar";
import userContext from "../../utils/context/userContext";

const Receipts = () => {
  const { isUserLoggedIn } = useContext(userContext);
  if (!isUserLoggedIn) {
    return <Redirect to="/login" />;
  }
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/products", text: "Sign Up" },
  ];
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
