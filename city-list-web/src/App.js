import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./internal/redux/store";
import { Provider } from "react-redux";
import Pages from "./pages";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Pages />
      </div>
    </Provider>
  );
}

export default App;
