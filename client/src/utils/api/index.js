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
  },
  searchWithBarcode: (barcode) => {
    return fetch("/api/users/products/barcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EAN: barcode
      })
    })
  },
  requestPasswordReset: (email) => {
    return fetch("/api/users/requestPasswordReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
  }
};

export default API;
