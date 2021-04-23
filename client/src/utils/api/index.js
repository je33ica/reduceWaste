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
};

export default API;
