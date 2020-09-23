import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";
import params from "./SupervisionSuccess/model/__mocks__/params.mock";

import "./App.scss";

const App = () => (
  <section className="app">
    <header className="app_header">
      <div className="app_header-container">
        <h2 className="app_header-heading">Supervision Success</h2>
        <p className="app_header-text">
          Project that impacts the Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Adipisci dolorem, exercitationem minus mollitia obcaecati ut vitae? Est Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. A accusantium commodi cupiditate, deleniti dolores
          dolorum eos ex hic laboriosam modi nemo, nesciunt numquam quia reprehenderit soluta, totam
          unde velit. Accusamus atque culpa dolores eligendi molestiae, porro reprehenderit sequi
          sint tempore.{" "}
          <a
            className="app_header-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Recidiviz/supervision-success-component"
          >
            laborum molestias nobis.
          </a>
        </p>
      </div>
    </header>
    <section className="app_supervision-success">
      <SupervisionSuccess params={params} />
    </section>
    <footer className="app_footer">
      <h3 className="app_footer-heading">Our Methodology</h3>
      <p className="app_footer-text">
        Savings per day is calculated as a graduated function of the population differential. If the
        population differential surpasses any of several thresholds for closing facilities, the
        total operating budget of those facilities is saved. For remaining population
        differentials-namely those between thresholds-a marginal daily cost per inmate is used.
      </p>
    </footer>
  </section>
);
export default App;
