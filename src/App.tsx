import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainNavigator from "./routes/MainNavigator";

function App() {
  return (
    <Router>
      <MainNavigator />
    </Router>
  );
}

export default App;
