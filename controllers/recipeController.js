const axios = require("axios");
const apiKey = process.env.EDAMAM_API_KEY;
const appID = process.env.EDAMAM_APP_ID;


module.exports = {
  findRecipes: (req, res) => {
    //the edamam api expects a comma seperated list of ingredients
    //our front end will send a post request with an array of ingredients
    //we then need to join them in to a csv string
    const ingredients = req.body.join(",");
    axios({
      method: "GET",
      url: `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=${ingredients}&to=12`,
    })
      .then((response) => res.json(response.data.hits))
      .catch((err) =>
        res.status(500).json({
          message:
            "Error. Our Recipe API is currently down. Please try again later",
        })
      );
  },
};
