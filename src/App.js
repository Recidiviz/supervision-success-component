import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";

import "./App.css";

const FAKE_PARAMS = {
  Alabama: {
    revocationsPopulation: 672,
    populationFraction: 0.02,
    totalPopulation: 33600,
    newOffensePopulation: 32928,
    revocationsAdmissions: 3571,
    admissionsFraction: 0.3,
    totalAdmissions: 11903.33333,
    newOffenseAdmissions: 8332.333333,
    newOffenseAvgTimeServedInYears: 47.42201064,
    revocationsTimescale: 2.258190983,
    newOffenseA: 14.64216936,
    revocationA: 131.7795242,
    totalCostPerInmate: 0.01785714286,
    marginalCostPerInmate: 0.001,
    // Should be sorted descending by checkpoint when parsed
    savingsMap: [
      {
        checkpoint: 3360,
        savings: 60,
      },
      {
        checkpoint: 2240,
        savings: 40,
      },
      {
        checkpoint: 1680,
        savings: 30,
      },
      {
        checkpoint: 672,
        savings: 12,
      },
    ],
  },
};

const App = () => (
  <div className="app">
    <h1 className="app-header">Supervision Success component example page</h1>
    <SupervisionSuccess params={FAKE_PARAMS} />
  </div>
);

export default App;
