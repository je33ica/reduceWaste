import { createContext } from "react";


const NavbarContext = createContext({
  navbarItems: []
});

export const NavBarContextProvider = (props) => {
  const context = {
    navbarItems: []
  }

  return (
    <NavbarContext.Provider value={context}>
      {props.children}
    </NavbarContext.Provider>
  )
}

export default NavbarContext