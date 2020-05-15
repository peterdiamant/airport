import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import flightsReducer from "../src/redux/reducers";
const store = createStore(
  flightsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  console.log("changed state: " + JSON.stringify(store.getState()));
});

const LoadingIndicator = (props) => {
  return <div></div>;
};

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
    <LoadingIndicator />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
