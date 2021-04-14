import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Account from "./pages/Account/Account";
import NoMatch from "./pages/NoMatch/NoMatch";
import Products from "./pages/Products/Products";
import AddProducts from "./pages/AddProducts/AddProducts";
import Receipt from "./pages/Receipt/Receipt";
import Barcode from "./pages/Barcode/Barcode";

//checking response from back end
function App() {
  return (
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
  );
}

export default App;
