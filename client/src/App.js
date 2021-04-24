import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import userContext from "./utils/context/userContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Receipt from "./pages/Receipt";
import Barcode from "./pages/Barcode";
import Dashboard from "./pages/Dashboard";

//checking response from back end
function App() {
  const [isUserLoggedIn, setUserLoginState] = useState(false);

  const setUserLogInStatus = (bool) => {
    setUserLoginState(bool);
  };

  return (
    <userContext.Provider value={{ isUserLoggedIn, setUserLogInStatus }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/addProducts">
            <AddProducts />
          </Route>
          <Route path="/receipt">
            <Receipt />
          </Route>
          <Route path="/barcode">
            <Barcode />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
