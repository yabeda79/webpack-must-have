interface IState {
  isAuthenticated: boolean;
}

export const initialState: IState = {
  isAuthenticated: false,
};

export const isAuthenticatedSelector = (state: IState): boolean => {
  return state.isAuthenticated;
};
