import { useContext, useState } from "react";
import { Redirect } from "react-router";
import NavBar from "../../components/NavBar";
import userContext from "../../utils/context/userContext";
import ImageUpload from "../../components/ImageUpload";
import ocrParser from "../../utils/ocrParser/ocrParser";
import ProductForm from "../../components/ProductForm";
import { uuid } from "uuidv4";

const Receipts = () => {
  const date = new Date().toISOString().slice(0, 10);

  const [resultsFromOcr, setResultsFromOcr] = useState([]);

  // we check, using context, if the user is logged in and if so we redirect them to the account page
  // the only way a logged in user would be able to access this page is by typing it direct in to the url
  //but we still wanted to guard against it
  // further check - if the user gets to a page by typing in the address, we can lose the log in status of the user s
  // we add a quick check to the backend to see if the user is currently logged in
  const { isUserLoggedIn, setUserLogInStatus } = useContext(userContext);

  //********************************************************** */

  // the following code is to protect the route from non logged in users. Uncomment following
  //testing

  // if (!isUserLoggedIn) {
  //   return <Redirect to="/" />;
  // }

  // **********************************************************

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  //helper function to convert image to base64
  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener("load", () => {
        res({
          base64: reader.result,
          name: name,
          type,
          size: size,
        });
      });
      reader.readAsDataURL(image);
    });
  };
  //uses the id, which we know will always be unique because the main array is only generated once
  const removeCard = (idToDelete) => {
    const productCards = [...resultsFromOcr];
    const filtered = productCards.filter(
      (product) => product.id !== idToDelete
    );
    setResultsFromOcr(filtered);
  };

  const updateElement = (value, target, id) => {
    let elementUpdated = false;
    const tempResults = [...resultsFromOcr];
    for (let i = 0; i < tempResults.length && !elementUpdated; i++) {
      if (tempResults[i].id === id) {
        tempResults[i][target] = value;
        elementUpdated = true;
      }
    }
    setResultsFromOcr(tempResults);
  };

  const addCard = () => {
    const tempObj = {
      productName: "",
      amount: "",
      expiry: date,
      id: uuid(),
      ean: "",
    };

    setResultsFromOcr([tempObj, ...resultsFromOcr]);
  };

  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true);
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      //grab all the images, save them to state
      setImages([
        ...images,
        ...newImages.filter((image) => image !== undefined),
      ]);
      // send the base 64 encoded string to our api
      fetch("/api/ocr", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: newImages[0].base64,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          setLoading(false);

          if (results.message) {
            //fail alert
            setDisplayPopup({
              show: true,
              type: "failure",
              message: results.message,
            });
          } else {
            //display the data
            const setFromOcr = new Set(ocrParser(results).slice(3));
            const cardObjects = Array.from(setFromOcr).map((productStr) => {
              return {
                productName: productStr,
                amount: "",
                expiry: date,
                id: uuid(),
                ean: "",
              };
            });
            setResultsFromOcr(cardObjects);
          }
        })
        .catch((err) => {
          //fail alert
          setDisplayPopup({
            show: true,
            type: "failure",
            message: err,
          });
        });
    }
  };

  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/products", text: "Sign Up" },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <div className="grid">
        <div className="grid-item">
          <h1 style={{ textAlign: "center" }}>Reduce Waste Receipt Uploader</h1>
          <p>
            Using the service below, you can upload scanned receipts and our
            Artificial Intelligence service will read the receipt for product
            information.
          </p>
          <small>
            Our AI service is constantly improving, however there may be some
            errors from reading the results. The form created below will be
            editable to allow you to correct any mistakes
          </small>
        </div>
        <div className="grid-item" style={{ textAlign: "center" }}>
          <ImageUpload
            uploadImage={uploadImage}
            loading={loading}
            displayPopup={displayPopup}
          />
        </div>
      </div>
      {resultsFromOcr.length > 0 && (
        <ProductForm
          addCard={addCard}
          resultsFromOcr={resultsFromOcr}
          updateElement={updateElement}
          removeCard={removeCard}
        />
      )}
    </>
  );
};

export default Receipts;
