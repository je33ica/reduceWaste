import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import {v4 as uuid} from "uuid";
import NavBar from "../../components/NavBar";
import PopUpAlert from "../../components/PopUpAlert";
import Loading from "../../components/Loading";
import navbarIcons from "../../icons/navbarIcons";

const AddProducts = () => {
  const date = new Date().toISOString().slice(0, 10);
  const [products, setProducts] = useState([
    {
      productName: "",
      amount: "",
      expiry: date,
      id: uuid(),
      EAN: "",
      category: "",
    },
  ]);

  const removeCard = (idToDelete) => {
    const productCards = [...products];
    const filtered = productCards.filter(
      (product) => product.id !== idToDelete
    );
    setProducts(filtered);
  };

  const updateElement = (value, target, id) => {
    let elementUpdated = false;
    const tempResults = [...products];
    for (let i = 0; i < tempResults.length && !elementUpdated; i++) {
      if (tempResults[i].id === id) {
        tempResults[i][target] = value;
        elementUpdated = true;
      }
    }
    setProducts(tempResults);
  };

  const addCard = (position) => {
    const tempObj = {
      productName: "",
      amount: "",
      expiry: date,
      id: uuid(),
      EAN: "",
      category: "",
    };
    if (position === "start") {
      setProducts([tempObj, ...products]);
    } else {
      setProducts([...products, tempObj]);
    }
  };

  // const productNameInput = useRef("");
  // const productAmountInput = useRef("");
  // const expiryDateInput = useRef("");

  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });
  const submitProductHandler = (e) => {
    e.preventDefault();

    //before fetch -> render the loading component
    //insde 2nd .then -> unrender loading component
    //render a a pop up alert based on the response
    //hanlde the promise relut with the succes/fail message - use registration form
    //the server expects an array
    setLoading(true);
    //submit the registration form
    const filtered = products.filter(product => product.productName !== "");
    if (filtered.length === 0){
      setLoading(false);
      setDisplayPopup({
        show: true,
        type: "failure",
        message: "You must add at least one product",
      });
      setTimeout(() => {
        setDisplayPopup({
          show: false,
        });
      }, 2000);
      return
    }
    fetch("api/users/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtered),
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
          setProducts([
            {
              productName: "",
              amount: "",
              expiry: date,
              id: uuid(),
              EAN: "",
              category: "",
            }
          ])
          setDisplayPopup({
            show: true,
            type: "success",
            message: "Products successfully saved",
          });
          setTimeout(() => {
            setDisplayPopup({
              show: false,
              type: "",
              message: "",
            });
          }, 1500);
        }
      })
      .catch((err) => {
        setDisplayPopup({
          show: true,
          type: "failure",
          message:
            "Sorry but your product could not be saved right now, please try again later",
        });
        setTimeout(() => {
          setDisplayPopup({
            show: false,
            type: "",
            message: "",
          });
        }, 1500);
      });
  };
  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user },
    { path: "/dashboard", text: "Your food store", icon: navbarIcons.bag },
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.upload },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <ProductForm
        addCard={addCard}
        productsArr={products}
        removeCard={removeCard}
        updateElement={updateElement}
        submitProductCardstoDB={submitProductHandler}
        loading={loading}
        displayPopup={displayPopup}
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
