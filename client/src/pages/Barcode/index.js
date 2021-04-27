import { useState } from "react";
import { v4 as uuid } from "uuid";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import PopUpAlert from "../../components/PopUpAlert";
import ProductForm from "../../components/ProductForm";
import Scanner from "../../components/Scanner";
import navbarIcons from "../../icons/navbarIcons";
import API from "../../utils/api";

const Barcode = () => {
  const date = new Date().toISOString().slice(0, 10);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(null);
  const toggleScanner = () => {
    setScanning(!scanning);
  };

  const readBarcode = (resultFromScan) => {
    if (resultFromScan?.codeResult?.code) {
      setResult(resultFromScan.codeResult.code);
      toggleScanner();
      setLoading(true);
      API.searchWithBarcode(resultFromScan.codeResult.code)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            return res.json();
          }
          setProduct({
            productName: "",
            amount: "",
            expiry: date,
            id: uuid(),
            EAN: "",
            category: "",
          });
        })
        .then((parsed) => {
          setProduct(parsed);
        })
        .catch((err) => {
          setLoading(false);
          setDisplayPopup({
            show: true,
            type: "failure",
            message:
              "Sorry, our server is currently not responding. Please try again later",
          });
          setTimeout(() => {
            setDisplayPopup({
              show: false,
              type: "",
              message: "",
            });
          }, 1500);
        });
    }
    return;
  };

  const submitProductHandler = (e) => {
    e.preventDefault();

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
      body: JSON.stringify([product]),
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

  const updateElement = (value, target, id) => {
    let elementUpdated = false;
    const tempResults = [product];
    for (let i = 0; i < tempResults.length && !elementUpdated; i++) {
      if (tempResults[i].id === id) {
        tempResults[i][target] = value;
        elementUpdated = true;
      }
    }
    setProduct(tempResults[0]);
  };

  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user },
    {
      path: "/dashboard",
      text: "Your store cupboard",
      icon: navbarIcons.bag,
    },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.upload },
    { path: "/addProducts", text: "Add products", icon: navbarIcons.add },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <div style={{ textAlign: "center" }}>
        <h1>Barcode Scanner</h1>
        <p>Scan the barcode of a product with the scanner below.</p>
        <p>If it is in your store cupboard we will find it for you or you can add it as a new product!</p>
        <button className="btn" type="button" onClick={toggleScanner}>
          {scanning ? "Stop" : "Start Scanner"}
        </button>
        {scanning && <Scanner readBarcode={readBarcode} toggleScanner={toggleScanner}/>}
        {result && <h4>Your barcode is {result}</h4>}
        {loading && <Loading />}
        {product?.productName && <p>We found the following product previously in your store. Would you like to add it again?</p>}
        {product && (
          <ProductForm
            updateElement={updateElement}
            productsArr={[product]}
            submitProductCardstoDB={submitProductHandler}
            loading={loading}
            displayPopup={displayPopup}
            single
          />
        )}
        {displayPopup.show && (
          //popup
          <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
        )}
      </div>
    </>
  );
};

export default Barcode;
