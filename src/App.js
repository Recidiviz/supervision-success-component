import React from "react";
import SupervisionSuccess from "./SupervisionSuccess";
import params from "./SupervisionSuccess/model/__mocks__/params.mock";

import "./App.scss";

const App = () => {
  const description = (
    <>
      Project that impacts the Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
      dolorem, exercitationem minus mollitia obcaecati ut vitae? Est Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. A accusantium commodi cupiditate, deleniti dolores dolorum eos
      ex hic laboriosam modi nemo, nesciunt numquam quia reprehenderit soluta, totam unde velit.
      Accusamus atque culpa dolores eligendi molestiae, porro reprehenderit sequi sint tempore.{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Recidiviz/supervision-success-component"
      >
        laborum molestias nobis.
      </a>
    </>
  );

  return (
    <div className="app">
      <SupervisionSuccess params={params} description={description} />
    </div>
  );
};
export default App;
