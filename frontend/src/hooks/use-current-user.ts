import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

interface CurrentUser {
  id: string;
  nome: string;
}

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.user) {
      setCurrentUser(JSON.parse(cookies.user));
    }
  }, []);

  return currentUser;
};
