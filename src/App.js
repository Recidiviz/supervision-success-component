// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";
import params from "./params.csv";

import "./App.scss";

const App = () => (
  <section className="app">
    <header className="app_header">
      <div className="app_header-container">
        <h2 className="app_header-heading">Supervision Success</h2>
        <p className="app_header-text">
          Parole and probation are significant contributors to incarceration in the United States.
          Minor violations of the conditions of supervision - something as simple as violating a
          curfew - can lead to the reincarceration of people who were just starting to get
          established back in their communities. Small changes in practice can have an outsized
          impact - for the community under supervision, for their families and friends, and even for
          the state’s bottom line. The model below uses recent data from our{" "}
          <a
            className="app_header-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://csgjusticecenter.org/publications/confined-costly/"
          >
            Confined and Costly report
          </a>{" "}
          to show the outcomes of a simple change in the revocation rate on state revenues and the
          lives of individuals under supervision.
        </p>
      </div>
    </header>
    <section className="app_supervision-success">
      <SupervisionSuccess path={params} />
    </section>
    <footer className="app_footer">
      <h3 className="app_footer-heading">Our Methodology</h3>
      <p className="app_footer-text">
        This model is meant to provide a simple but robust projection from changes to a states’
        revocation rate. At a given time, the prison population is captured as a continuous
        distribution of inmates over remaining sentence length, incorporating early release. This
        distribution is then integrated to compute the total prison population at the given time. To
        ensure the model can be applied across states using public data, several simplifying
        assumptions are made, including: (a) that prison population is in equilibrium before
        revocation rate is changed, (b) an idealized distribution of sentences of admissions, and
        (c) a constant average time served. <br />
        <br />
        In this model, savings per day is calculated as a graduated function of the population
        differential. If the population differential surpasses any of several thresholds for closing
        facilities, the total operating budget of those facilities is saved. For remaining
        population differentials–namely those between thresholds–a marginal daily cost per inmate is
        used.
      </p>
    </footer>
  </section>
);

export default App;
