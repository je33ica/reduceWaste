import { useRef } from "react";
import AddProductForm from "../../components/AddProductForm";
import NavBar from "../../components/NavBar";

const AddProducts = () => {
  const productNameInput = useRef("");
  const productAmountInput = useRef("");
  const expiryDateInput = useRef("");

  const submitProductHandler = (e) => {
    e.preventDefault();
    const productName = productNameInput.current.value.trim();
    const amount = productAmountInput.current.value.trim();
    const expiry = expiryDateInput.current.value.trim();

    const addNewProduct = {
      productName,
      amount,
      expiry,
    };
    console.log("im the new prodcut", addNewProduct);

    //before fetch -> render the loading component
    //insde 2nd .then -> unrender loading component
    //render a a pop up alert based on the response
    //hanlde the promise relut with the succes/fail message - use registration form

    // fetch("api/users/products", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(addNewProduct),

    // })
    // .then((res) => res.json())
    // .then((result) => {

    // })
  };
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/barcode", text: "Barcode scanner" },
    { path: "/receipt", text: "Upload receipt" },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <AddProductForm
        productName={productNameInput}
        productAmount={productAmountInput}
        expiryDate={expiryDateInput}
        submitProductHandler={submitProductHandler}
      />
    </>
  );
};

export default AddProducts;
