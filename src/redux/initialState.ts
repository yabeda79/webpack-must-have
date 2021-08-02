export interface IState {
  user: IUser | null;
}

export const initialState: IState = {
  user: null,
};

export interface IUser {
  token: string;
  userId: string;
}
