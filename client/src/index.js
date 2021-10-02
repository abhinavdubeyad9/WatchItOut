import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { store, presistor } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={presistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
