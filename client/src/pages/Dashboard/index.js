import { useState, useEffect } from "react";
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
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

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
    if (ingredientsArr.length === 0){
      setDisplayPopup({
        show: true,
        type: "failure",
        message: "You need to select at least 1 ingredient",
      })
      setTimeout(() => {
        setDisplayPopup({
          show: false,
          type: "",
          message: "",
        })
      }, 2000)
      return  
    }
    API.findRecipes(ingredientsArr)
      .then((res) => res.json())
      .then((results) => {
        setRecipes(results);
        if (recipes[0].length === 0){
          setDisplayPopup({
            show: true,
            type: "failure",
            message: "Sorry, no recipes were found which matched those ingredients",
          })
          setTimeout(() => {
            setDisplayPopup({
              show: false,
              type: "",
              message: "",
            })
          }, 2000)
          return  
        }
      })
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
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.upload }, //chnage icon
    { path: "/addProducts", text: "Add products", icon: navbarIcons.add },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <RecipeHolder searchRecipes={searchRecipes} recipes={recipes}/>
      {products.length > 0 ? (
        <DashboardTable products={products} ingredients={ingredients} updateIngredients={updateIngredients}/>
      ) : (
        <h1>No products in DB</h1>
      )}
      {displayPopup.show && <PopUpAlert type={displayPopup.type} message={displayPopup.message}/>}
    </>
  );
};

export default Dashboard;
