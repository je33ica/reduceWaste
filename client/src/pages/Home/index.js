import NavBar from "../../components/NavBar";
import Landing from "../../components/Landing";

const Home = () => {
  const navBarItems = [
    { path: "/login", text: "Login" },
    { path: "/registration", text: "Sign Up" },
  ];
  return (
    <>
      {/* left hand side is the prop name- right is value */}
      <NavBar navBarItems={navBarItems} />
      <Landing />
    </>
  );
};

export default Home;
