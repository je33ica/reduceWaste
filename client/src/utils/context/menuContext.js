import {createContext} from "react";

const menuContext = createContext({
  displayMenu: undefined,
  toggleMenu: () => {}
})

export default menuContext