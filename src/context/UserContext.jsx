import React, { createContext, useContext, useState } from "react";

// ✅ Create the context
const UserContext = createContext();

// ✅ Provider component to wrap around your app
export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  const saveUserDetails = (details) => {
    setUserDetails(details);
  };

  return (
    <UserContext.Provider value={{ userDetails, saveUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Custom hook to use context easily
// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}
