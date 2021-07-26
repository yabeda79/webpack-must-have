import { IState } from "./initialState";

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticatedSelector = (state: IState): boolean => state.isAuthenticated;
