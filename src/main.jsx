
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./Router";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
