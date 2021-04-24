const axios = require("axios");
const apiKey = process.env.SPOONACULAR_API_KEY;

module.exports = {
  findRecipes: (req, res) => {
    //the spoonacular api expects a comma seperated list of ingredients
    //our front end will send a post request with an array of ingredients
    //we then need to join them in to a csv string
    const ingredients = req.body.join(",");
    axios({
      method: "GET",
      url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ignorePantry=true&apiKey=${apiKey}`,
    })
      .then((response) => res.json(response.data))
      .catch((err) =>
        res.status(500).json({
          message:
            "Error. Our Recipe API is currently down. Please try again later",
        })
      );
  },
};
