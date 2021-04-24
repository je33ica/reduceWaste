import { useRef, useState } from "react";
import AddProductForm from "../../components/AddProductForm";
import NavBar from "../../components/NavBar";
import PopUpAlert from "../../components/PopUpAlert";
import Loading from "../../components/Loading";

const AddProducts = () => {
  const productNameInput = useRef("");
  const productAmountInput = useRef("");
  const expiryDateInput = useRef("");

  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });
  const submitProductHandler = (e) => {
    e.preventDefault();
    const productName = productNameInput.current.value.trim();
    const amount = productAmountInput.current.value.trim();
    const expiry = expiryDateInput.current.value.trim();

    const addNewProduct = [
      {
        productName,
        amount,
        expiry,
      },
    ];
    console.log("im the new prodcut", addNewProduct);
    //before fetch -> render the loading component
    //insde 2nd .then -> unrender loading component
    //render a a pop up alert based on the response
    //hanlde the promise relut with the succes/fail message - use registration form
    //the server expects an array
    setLoading(true);
    //submit the registration form
    fetch("api/users/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.message) {
          setDisplayPopup({
            show: true,
            type: "failure",
            message: result.message,
          });
        } else {
          setDisplayPopup({
            show: true,
            type: "success",
            message: "Product successfully saved",
          });
        }
      })
      .catch((err) =>
        setDisplayPopup({
          show: true,
          type: "failure",
          message:
            "Sorry but your product could not be saved right now, please try again later",
        })
      );
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

      {loading && <Loading />}
      {displayPopup.show && (
        //popup
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default AddProducts;
