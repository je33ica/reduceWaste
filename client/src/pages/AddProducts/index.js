import { useRef, useState } from "react";

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

    const addNewProduct = [
      {
        productName,
        amount,
        expiry,
      },
    ];
    console.log("im the new prodcut", addNewProduct);

   
    
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/barcode", text: "Barcode scanner" },
    { path: "/receipt", text: "Upload receipt" },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
     
    </>
  );
};

export default AddProducts;
