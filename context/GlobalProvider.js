import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { useColorScheme } from "nativewind";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  // Athentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // User Change Password
  const [userChangePassword, setUserChangePassword] = useState(null);
  // Status
  const [isOnline, setIsOnline] = useState(true);
  // Dark Mode
  const {colorScheme, setColorScheme} = useColorScheme();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isOnline,
        setIsOnline,
        colorScheme,
        setColorScheme,
        userChangePassword,
        setUserChangePassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
