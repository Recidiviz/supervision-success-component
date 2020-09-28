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
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessContainer from "./SupervisionSuccessContainer";
import deriveModelParamsFromCsvString from "./utils/deriveModelParamsFromCsvString";
import LoadingScreen from "./components/LoadingScreen";
import { ERROR_RESPONSE_NOT_OK, ERROR_NOT_CSV_FETCHED } from "./constants";
import "blob-polyfill";

const SupervisionSuccess = ({ path }) => {
  const [isError, setIsError] = useState(false);
  const [params, setParams] = useState(null);

  useEffect(() => {
    const fetchCSVString = async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(ERROR_RESPONSE_NOT_OK(text));
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
