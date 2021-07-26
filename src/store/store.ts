import { createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(authReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
