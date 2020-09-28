export const ERROR_RESPONSE_NOT_OK = (response) =>
  `An error happened while attempting to load the params file. Response was: ${response}`;
export const ERROR_NOT_CSV_FETCHED =
  "Could not load the params file, either because the file was not found or it was not of type 'text/csv'";
export const ERROR_NO_ROWS =
  "Parser didn't find any data rows, check the documentation in the readme to see the requirements for file formatting";
export const LS_PERSIST_KEY = "persistedValues";
export const DEFAULT_STATE = { implementationPeriod: 6, projections: 5, changeInRevocations: -50 };
