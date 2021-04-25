const API = {
  checkIfUserIsLoggedIn: () => {
    return fetch("/api/users");
  },
  addProducts: (products) => {
    return fetch("api/users/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
  },
  findRecipes: (ingredients) => {
    return fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
    })
  },
  userLogout: () => {
    return fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
};

export default API;
