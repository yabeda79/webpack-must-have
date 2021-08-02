import { IUser } from "@/redux/initialState";
import { SIGN_IN, SIGN_OUT } from "./constants";

export interface ISignOut {
  type: string;
}

export interface ISignIn extends ISignOut {
  payload: IUser;
}

export const signIn = (user: IUser): ISignIn => ({ type: SIGN_IN, payload: user });

export const signOut = (): ISignOut => ({ type: SIGN_OUT });
