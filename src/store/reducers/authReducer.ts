import { initialState } from "../initialState";

const authReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case "SIGN_IN":
      return { isAuthenticated: true };
    case "SIGN_OUT":
      return { isAuthenticated: false };
    default:
      return { state };
  }
};

export default authReducer;
