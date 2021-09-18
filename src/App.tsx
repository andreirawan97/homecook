import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider as StoreProvider } from "react-redux";

import rootReducer from "./reducers";
import MainNavigator from "./routes/MainNavigator";

function App() {
  const store = createStore(rootReducer);

  return (
    <StoreProvider store={store}>
      <Router>
        <MainNavigator />
      </Router>
    </StoreProvider>
  );
}

export default App;
