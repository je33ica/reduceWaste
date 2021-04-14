import NavBar from "../components/NavBar";

const Home = () => {
  const navBarItems = [
    { path: "/login", text: "Login" },
    { path: "/registration", text: "Sign Up" },
  ];
  return (
    <>
      {/* left hand side is the prop name- right is value */}
      <NavBar navBarItems={navBarItems} />
      <h1>Welcome to the home page</h1>
    </>
  );
};

export default Home;
