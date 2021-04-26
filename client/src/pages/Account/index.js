import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import navbarIcons from "../../icons/navbarIcons";

const Account = () => {
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((result) => {
        console.log("im the result", result);
      });
  }, []);
  const navBarItems = [
    { path: "/dashboard", text: "Your food store", icon: navbarIcons.bag },
    { path: "/addProducts", text: "Add new products", icon: navbarIcons.add },
    { path: "/receipt", text: "Upload receipts", icon: navbarIcons.upload },
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1> Welcome to the Account page</h1>
    </>
  );
};

export default Account;

// product page
// add Products
//recipt uploader
//barcode scanner
//manual
