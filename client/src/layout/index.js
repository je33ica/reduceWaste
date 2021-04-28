import NavBar from "../components/NavBar"

const Layout = (props) => {
  return (
    <>
    <header>
      <NavBar />
    </header>
    <main>
      {props.children}
    </main>
    </>
  )
}

export default Layout