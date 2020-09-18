import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";
import params from "./params.csv";

import "./App.css";

const App = () => (
  <div className="app">
    <h1 className="app-header">Supervision Success component example page</h1>
    <SupervisionSuccess path={params} />
  </div>
);

export default App;
