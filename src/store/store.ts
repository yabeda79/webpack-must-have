import { createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(thunk))
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
