import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserSelector, isAuthenticatedSelector } from "@/redux/selectors";
import { signIn, signOut } from "@/redux/actions/auth/actions";
import { IUser } from "@/redux/initialState";
import { LOCAL_STORAGE_AUTH } from "../localstorage";

interface IUseAuth {
  login: (user: IUser) => void;
  logout: () => void;
  user: IUser | null;
  isAuthenticated: boolean;
}

export const useAuth = (): IUseAuth => {
  // const isAlreadyAuthed = useRef<boolean>(false)
  const user = useSelector(getUserSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const login = useCallback((userProp: IUser) => {
    dispatch(signIn(userProp));

    localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(userProp));
  }, []);

  const logout = useCallback(() => {
    dispatch(signOut());
    localStorage.removeItem(LOCAL_STORAGE_AUTH);
  }, []);

  return { login, logout, user, isAuthenticated };
};
