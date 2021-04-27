import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardTable from "../../components/Dashboard";
import NavBar from "../../components/NavBar";
import PopUpAlert from "../../components/PopUpAlert";
import RecipeHolder from "../../components/RecipeHolder";
import navbarIcons from "../../icons/navbarIcons";
import API from "../../utils/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const updateIngredients = (ingredient) => {
    const tempIngredients = { ...ingredients };
    if (!tempIngredients[ingredient]) {
      tempIngredients[ingredient] = true;
    } else {
      tempIngredients[ingredient] = false;
    }

    setIngredients(tempIngredients);
  };

  const searchRecipes = () => {
    const ingredientsArr = [];
    setRecipes([]);
    for (const key in ingredients) {
      if (ingredients[key]) {
        ingredientsArr.push(key);
      }
    }
    if (ingredientsArr.length === 0) {
      setDisplayPopup({
        show: true,
        type: "failure",
        message: "You need to select at least 1 ingredient",
      });
      setTimeout(() => {
        setDisplayPopup({
          show: false,
          type: "",
          message: "",
        });
      }, 2000);
      return;
    }
    setLoading(true);
    API.findRecipes(ingredientsArr)
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setRecipes(results);
        if (recipes[0].length === 0) {
          setDisplayPopup({
            show: true,
            type: "failure",
            message:
              "Sorry, no recipes were found which matched those ingredients",
          });
          setTimeout(() => {
            setDisplayPopup({
              show: false,
              type: "",
              message: "",
            });
          }, 2000);
          return;
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch("api/users/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const removeProductFromView = (id) => {
    const newProducts = products.filter((product) => product._id !== id);

    setProducts(newProducts);
    fetch("api/users/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => {
        console.log("im the response", response);
        response.json();
      })
      .then((parsed) => console.log(parsed));
  };

  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user }, //change icon?
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.upload }, //chnage icon
    { path: "/addProducts", text: "Add products", icon: navbarIcons.add },
  ];

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Your food store </h1>
      <NavBar navBarItems={navBarItems} />

      {products.length > 0 ? (
        <>
          <RecipeHolder
            searchRecipes={searchRecipes}
            recipes={recipes}
            loading={loading}
          />
          <DashboardTable
            products={products}
            ingredients={ingredients}
            updateIngredients={updateIngredients}
            removeProductFromView={removeProductFromView}
          />
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          You don't have any products in your store yet. Click{" "}
          <Link to="/addProducts" className="inlineLink">
            here
          </Link>{" "}
          to add products or try our{" "}
          <Link to="/receipts" className="inlineLink">
            Receipt Reader
          </Link>{" "}
          instead.
        </p>
      )}
      {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default Dashboard;
