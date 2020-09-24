export const ERROR_RESPONSE_NOT_OK = (response) =>
  `An error happened while attempting to load the params file. Response was: ${response}`;
export const ERROR_NOT_CSV_FETCHED =
  "Could not load the params file, either because the file was not found or it was not of type 'text/csv'";
export const ERROR_CHECKPOINTS = `Savings and Checkpoint columns in the params file do not align as expected. 
Either there is an issue with these columns specifically, or a missing column further to the left in the file 
is causing these columns to be offset in a way that prevents proper parsing. Check the documentation in the readme 
to see the requirements for the file formatting`;
export const ERROR_NO_ROWS =
  "Parser didn't found any data rows, check the documentation in the readme to see the requirements for the file formatting";
