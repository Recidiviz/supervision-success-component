import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";
import params from "./SupervisionSuccess/model/__mocks__/params.mock";

import "./App.css";

const App = () => (
  <div className="app">
    <h1 className="app-header">Supervision Success component example page</h1>
    <SupervisionSuccess params={params} />
  </div>
);

export default App;
