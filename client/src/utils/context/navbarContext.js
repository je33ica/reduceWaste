import { createContext, useState } from "react";


const NavbarContext = createContext({
  navbarItems: [],
  setNavBarItems: () => {}
});

export const NavBarContextProvider = (props) => {
  const [items, setItems] = useState([])
  const context = {
    navbarItems: [],
    setNavBarItems: updateNavBarItems
  }

  const updateNavBarItems = (items) => {
    setItems(items)
  }

  return (
    <NavbarContext.Provider value={context}>
      {props.children}
    </NavbarContext.Provider>
  )
}

export default NavbarContext