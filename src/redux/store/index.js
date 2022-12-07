import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";

const store = createStore(
  combineReducers({
    productReducer,
    products: productReducer,
    categories: categoryReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;