import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import userContext from "./utils/context/userContext";
import menuContext from "./utils/context/menuContext"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch";
import AddProducts from "./pages/AddProducts";
import Receipt from "./pages/Receipt";
import Barcode from "./pages/Barcode";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import RequestReset from "./pages/RequestReset";

//checking response from back end
function App() {
  const [isUserLoggedIn, setUserLoginState] = useState(false);

  const setUserLogInStatus = (bool) => {
    setUserLoginState(bool);
  };

  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleMenu = (bool) => {
    setDisplayMenu(bool)
  }

  return (
    <userContext.Provider value={{ isUserLoggedIn, setUserLogInStatus }}>
      <menuContext.Provider value={{displayMenu, toggleMenu}}>
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
            <Route path="/addProducts">
              <AddProducts />
            </Route>
            <Route path="/receipt">
              <Receipt />
            </Route>
            <Route path="/barcode">
              <Barcode />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/passwordReset">
              <PasswordReset />
            </Route>
            <Route path="/requestPasswordReset">
              <RequestReset />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </menuContext.Provider>
    </userContext.Provider>
  );
}

export default App;
