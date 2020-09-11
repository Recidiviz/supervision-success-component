import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";

import "./App.css";

const App = () => {
  const sampleParams = {};

  return (
    <div className="app">
      <h1 className="app-header">Supervision Success component example page</h1>
      <SupervisionSuccess params={sampleParams} />
    </div>
  );
};

export default App;
