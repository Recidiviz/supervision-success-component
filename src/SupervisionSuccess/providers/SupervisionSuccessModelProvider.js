import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const SupervisionSuccessModelContext = createContext({});

const SupervisionSuccessModelProvider = ({ children }) => {
  const [changeInRevocations, setChangeInRevocations] = useState(-50);

  const value = useMemo(
    () => ({
      changeInRevocations,
      setChangeInRevocations,
    }),
    [changeInRevocations]
  );

  return (
    <SupervisionSuccessModelContext.Provider value={value}>
      {children}
    </SupervisionSuccessModelContext.Provider>
  );
};

SupervisionSuccessModelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SupervisionSuccessModelProvider;
