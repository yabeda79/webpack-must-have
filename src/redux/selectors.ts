import { IState, IUser } from "./initialState";

export const getUserSelector = (state: IState): IUser | null => state.user;
export const isAuthenticatedSelector = (state: IState): boolean => !!getUserSelector(state);
