import { initialState, IState } from "../initialState";

const authReducer = (state: IState = initialState, action: { type: string }): IState => {
  switch (action.type) {
    case "SIGN_IN":
      return { isAuthenticated: true };
    case "SIGN_OUT":
      return { isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
