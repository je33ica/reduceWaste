import { useState, useEffect } from "react";
import DashboardTable from "../../components/Dashboard";
import NavBar from "../../components/NavBar";
import navbarIcons from "../../icons/navbarIcons";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("api/users/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        console.log(result);
      });
  }, []);

  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user }, //change icon?
    { path: "/barcode", text: "Barcode scanner", icon: navbarIcons.barcode },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.add }, //chnage icon
    { path: "/addProducts", text: "Upload receipt", icon: navbarIcons.add },
  ];

  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <DashboardTable products={products} />;
    </>
  );
};

export default Dashboard;
