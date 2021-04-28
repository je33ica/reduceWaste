import { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import UserCard from "../../components/UserCard";
import navbarIcons from "../../icons/navbarIcons";
import NavbarContext from "../../utils/context/navbarContext";
import userContext from "../../utils/context/userContext";

const Account = () => {
  const [user, setUser] = useState(null);
  const { isUserLoggedIn, setUserLogInStatus } = useContext(userContext);
  const navbarCtx = useContext(NavbarContext)

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((result) => {
        if (result.username){
          setUser(result)
        }
      });
  }, []);
  const navBarItems = [
    { path: "/dashboard", text: "Your food store", icon: navbarIcons.bag },
    { path: "/addProducts", text: "Add new products", icon: navbarIcons.add },
    { path: "/receipt", text: "Upload receipts", icon: navbarIcons.upload },
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
  ];
  if (!isUserLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      {user ? (
        <>
          <UserCard user={user}/>
          <p style={{textAlign: "center"}}>Visit your <Link className="inlineLink" to="/dashboard">store cupboard</Link> or click <Link to="/addProducts" className="inlineLink">here</Link> to add products.</p>
        </>
        )
        : <Loading />}
    </>
  );
};

export default Account;

// product page
// add Products
//recipt uploader
//barcode scanner
//manual
