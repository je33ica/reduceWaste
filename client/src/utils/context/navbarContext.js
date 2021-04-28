import { createContext } from "react";


const NavbarContext = createContext({
  navbarItems: [],
  updateNavbarItems: () => {}
});

// export const NavBarContextProvider = (props) => {
//   const [items, setItems] = useState([])

//   const updateNavBarItems = (items) => {
//     setItems(items)
//   }

//   const context = {
//     navbarItems: items,
//     setNavBarItems: updateNavBarItems
//   }

//   return (
//     <NavbarContext.Provider value={context}>
//       {props.children}
//     </NavbarContext.Provider>
//   )
// }

export default NavbarContext