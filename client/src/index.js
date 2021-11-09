import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; 
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
