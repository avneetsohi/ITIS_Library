import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import { rootReducer } from "./reducer";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store=configureStore({
  reducer:rootReducer
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
        <Toaster/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
