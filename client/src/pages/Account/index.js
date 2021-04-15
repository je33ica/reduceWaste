import { useEffect } from "react";
import NavBar from "../../components/NavBar";

const Account = () => {
  useEffect(() => {
    fetch("/api/users/products")
      .then((res) => res.json())
      .then((result) => {
        console.log("im the result", result);
      });
  }, []);
  const navBarItems = [
    { path: "/products", text: "View all products" },
    { path: "/addProducts", text: "Add new products" },
    { path: "/reciept", text: "Upload reciepts" },
    { path: "/barcode", text: "Barcode scanner" },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1> Welcome to the Account page</h1>;
    </>
  );
};

export default Account;

// product page
// add Products
//recipt uploader
//barcode scanner
//manual
