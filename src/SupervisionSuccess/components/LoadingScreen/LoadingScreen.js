import React, { memo } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import "./LoadingScreen.css";

const LoadingScreen = () => (
  <div className="loading-screen">
    <BounceLoader size={60} color="#27edc3" />
  </div>
);

export default memo(LoadingScreen);
