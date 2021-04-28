import { createContext, useState } from "react";


const NavbarContext = createContext({
  navbarItems: [],
  setNavBarItems: () => {}
});

export const NavBarContextProvider = (props) => {
  const [items, setItems] = useState([])

  const updateNavBarItems = (items) => {
    setItems(items)
  }

  const context = {
    navbarItems: items,
    setNavBarItems: updateNavBarItems
  }

  return (
    <NavbarContext.Provider value={context}>
      {props.children}
    </NavbarContext.Provider>
  )
}

export default NavbarContext