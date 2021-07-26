import { SIGN_IN, SIGN_OUT } from "./constants";

interface ISign {
  type: string;
}

export const signIn = (): ISign => ({ type: SIGN_IN });

export const signOut = (): ISign => ({ type: SIGN_OUT });
