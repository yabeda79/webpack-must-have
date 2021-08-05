import { initialState, IState, IUser } from "../initialState";
import { SIGN_IN, SIGN_OUT } from "../actions/auth/constants";

interface IAction {
  type: string;
  payload: IUser;
}

const authReducer = (state: IState = initialState, action: IAction): IState => {
  console.log(action.type);
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
