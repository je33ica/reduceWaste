//note: we are not using react for authN and authZ. Auth is handled by backend entirely.
//we simply track if the user is logged in with context to conditionally render certain components
// the data is still provided by the back end

import { createContext } from "react";

//we define the schema here, the values are provided by the provider
const userContext = createContext({
  isUserLoggedIn: undefined,
});

export default userContext;
