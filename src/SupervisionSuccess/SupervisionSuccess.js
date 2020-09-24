/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessContainer from "./SupervisionSuccessContainer";
import deriveModelParamsFromCsvString from "./utils/deriveModelParamsFromCsvString";
import LoadingScreen from "./components/LoadingScreen";
import { ERROR_RESPONSE_NOT_OK, ERROR_NOT_CSV_FETCHED } from "./constants";

const SupervisionSuccess = ({ path }) => {
  const [isError, setIsError] = useState(false);
  const [params, setParams] = useState(null);

  useEffect(() => {
    const fetchCSVString = async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(ERROR_RESPONSE_NOT_OK);
        }
        const blob = await response.blob();
        if (blob.type !== "text/csv") {
          throw new Error(ERROR_NOT_CSV_FETCHED);
        }
        const CSVString = await blob.text();
        const newParams = await deriveModelParamsFromCsvString(CSVString);
        setParams(newParams);
      } catch (e) {
        console.log(e.toString());
        setIsError(true);
        setParams({});
      }
    };
    fetchCSVString();
  }, [path]);

  if (params === null) return <LoadingScreen />;

  return <SupervisionSuccessContainer isError={isError} params={params} />;
};

SupervisionSuccess.propTypes = {
  path: PropTypes.string.isRequired,
};

export default SupervisionSuccess;
