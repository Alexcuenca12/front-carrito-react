import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
// Redux
import { Provider } from "react-redux";
import store from "./app/reducers/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
