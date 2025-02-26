import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { API } from "../services/api/CreateAxios";
import { Links } from "../types/constants/Links/Links";
import {
  AuthState,
  User,
  UserContextProviderProps,
  UserContextType,
} from "../types/interfaces/interface";
import { toast } from "react-toastify";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const token = useSelector((state: AuthState) => state.auth.token);
  const isLoggedIn: boolean = !!token;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await API.get(`${Links.GETUSER}`);
        if (response.data && response.data.success) {
          setUser(response.data.data);
        }
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          toast.error(err.response?.data || err.message);
        }
      }
    };

    if (isLoggedIn) {
      getUsers();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
