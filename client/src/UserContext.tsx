import axios from "axios";
import { createContext, useEffect, useState } from "react";

export interface UserContextType {
  user: any; // Replace 'any' with the actual type of user data, e.g., { name: string; email: string; }
  setUser: (user: any) => void; // Replace 'any' with the type of the setUser function
  ready: boolean;
  setReady: (ready: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  ready: false,
  setReady: () => {},
});

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
