const API = {
  checkIfUserIsLoggedIn: () => {
    return fetch("/api/users");
  },
};

export default API;
