/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessContainer from "./SupervisionSuccessContainer";
import convertCSVStringToParams from "./utils/convertCSVStringToParams";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import { CSV_PROCESSING_ERROR } from "./constants";

const SupervisionSuccess = ({ path }) => {
  const [error, setError] = useState(null);
  const [params, setParams] = useState(null);

  useEffect(() => {
    const fetchCSVString = async () => {
      try {
        const response = await fetch(path);
        const blob = await response.blob();
        const CSVString = await blob.text();
        // TODO(9): Add csv format validation and throw error if some field is missing
        const newParams = await convertCSVStringToParams(CSVString);
        setParams(newParams);
      } catch (e) {
        console.error(e);
        setError(CSV_PROCESSING_ERROR);
      }
    };
    fetchCSVString();
  }, [path]);

  if (error) return <ErrorScreen error={error} />;
  if (params === null) return <LoadingScreen />;

  return <SupervisionSuccessContainer params={params} />;
};

SupervisionSuccess.propTypes = {
  path: PropTypes.string.isRequired,
};

export default SupervisionSuccess;
