import { useState, useEffect } from "react";
import DashboardTable from "../../components/Dashboard";
import NavBar from "../../components/NavBar";
import RecipeHolder from "../../components/RecipeHolder";
import navbarIcons from "../../icons/navbarIcons";
import API from "../../utils/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState({});

  const updateIngredients = (ingredient) => {
    const tempIngredients = {...ingredients};
    if (!tempIngredients[ingredient]){
      tempIngredients[ingredient] = true
    } else {
      tempIngredients[ingredient] = false
    }

    setIngredients(tempIngredients)
  }

  const searchRecipes = () => {
    const ingredientsArr = [];
    for (const key in ingredients){
      if (ingredients[key]){
        ingredientsArr.push(key)
      }
    }
    API.findRecipes(ingredientsArr)
      .then((res) => res.json())
      .then((results) => console.log(results))
      .catch((err) => console.log(err));

  } 
  useEffect(() => {
    fetch("api/users/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user }, //change icon?
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.add }, //chnage icon
    { path: "/addProducts", text: "Add products", icon: navbarIcons.add },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <RecipeHolder searchRecipes={searchRecipes}/>
      {products.length > 0 ? (
        <DashboardTable products={products} ingredients={ingredients} updateIngredients={updateIngredients}/>
      ) : (
        <h1>No products in DB</h1>
      )}
    </>
  );
};

export default Dashboard;
