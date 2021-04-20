import NavBar from "../../components/NavBar";

const Products = () => {
  const navBarItems = [
    { path: "/account", text: "Account" },
    { path: "/barcode", text: "Barcode scanner" },
    { path: "/receipt", text: "Upload receipt" },
    { path: "/addProducts", text: "Add Products" },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
    </>
  );
};

export default Products;
