import DashboardTable from "../../components/Dashboard";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/barcode", text: "Barcode scanner" },
    { path: "/receipt", text: "Upload receipt" },
    { path: "/addProducts", text: "Upload receipt" },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <DashboardTable />;
    </>
  );
};

export default Dashboard;
