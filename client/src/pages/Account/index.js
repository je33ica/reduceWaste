import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import UserCard from "../../components/UserCard";
import navbarIcons from "../../icons/navbarIcons";

const Account = () => {
  const [user, setUser] = useState(null)

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
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      {user ? <UserCard user={user}/>: <Loading />}
    </>
  );
};

export default Account;

// product page
// add Products
//recipt uploader
//barcode scanner
//manual
