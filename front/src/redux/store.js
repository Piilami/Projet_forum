import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postInteractionReducer from "./reducers/postInteractionReducer";
import adminReducer from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    posts: postReducer,
    postInteraction: postInteractionReducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
