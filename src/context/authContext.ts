import { createContext } from "react";

function noop() {}

interface IUser {
  token: string;
  userId: number;
}

interface IAuthContext {
  user: IUser | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: noop,
  logout: noop,
});
