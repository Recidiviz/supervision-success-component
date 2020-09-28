# Supervision Success

[![Coverage Status](https://coveralls.io/repos/github/Recidiviz/supervision-success-component/badge.svg?branch=master)](https://coveralls.io/github/Recidiviz/supervision-success-component?branch=master)

A React component powering a miniature web app for exploring the impact of success in supervision on the justice system at large

## Contents

1. [Input File Format](w#input-file-format)

## Input File Format

An example of a valid CSV file can be found in [`params.csv`](/src/params.csv).

The first row of the file (the headers) contains revocation model parameters **in fixed order**.

- \[A] `State`
- \[B] `Data Year`
- \[C] `Revocations Population [C&C input]`
- \[D] `Population Fraction [C&C input]`
- \[E] `Revocations Admissions [C&C input]`
- \[F] `Admissions Fraction [C&C input]`
- \[G] `total cost per inmate [input]`
- \[H] `marginal cost per inmate [input]`
- \[I] `checkpoint (number of fewer people incarcerated) [input]`
- \[J] `associated savings [input]`
- \[K] `checkpoint (number of fewer people incarcerated) [input]`
- \[L] `associated savings [input]`
- \[M] `checkpoint (number of fewer people incarcerated) [input]`
- \[N] `associated savings [input]`
- \[O] `checkpoint (number of fewer people incarcerated) [input]`
- \[P] `associated savings [input]`
- \[Q] `Total Population`
- \[R] `New Offense Population`
- \[S] `Total Admissions`
- \[T] `New Offense Admissions`
- \[U] `New Offense Avg Time Served in Months`
- \[V] `Revocations Timescale`
- \[W] `N A`
- \[X] `R A`

Each row after the first row should correspond to a single state. Each row should include the parameters necessary for
accurately modeling revocations within that state.

Example of valid model parameters presented below.

**Note:** these are formatted as a table in Markdown for readability, but these tables are not valid
CSV and the exact formatting should be provided as described above.

| State   | Data Year | Revocations Population \[C&C input] | Population Fraction \[C&C input] | Revocations Admissions \[C&C input] | Admissions Fraction \[C&C input] | total cost per inmate \[input] | marginal cost per inmate \[input] | checkpoint (number of fewer people incarcerated) \[input] | associated savings \[input] | checkpoint (number of fewer people incarcerated) \[input] | associated savings \[input] | checkpoint (number of fewer people incarcerated) \[input] | associated savings \[input] | checkpoint (number of fewer people incarcerated) \[input] | associated savings \[input] | Total Population | New Offense Population | Total Admissions | New Offense Admissions | New Offense Avg Time Served in Months | Revocations Timescale | N A         | R A         |
| ------- | --------- | ----------------------------------- | -------------------------------- | ----------------------------------- | -------------------------------- | ------------------------------ | --------------------------------- | --------------------------------------------------------- | --------------------------- | --------------------------------------------------------- | --------------------------- | --------------------------------------------------------- | --------------------------- | --------------------------------------------------------- | --------------------------- | ---------------- | ---------------------- | ---------------- | ---------------------- | ------------------------------------- | --------------------- | ----------- | ----------- |
| Alabama | 2017      | 672                                 | 0.02                             | 3571                                | 0.3                              | 0.01785714286                  | 0.001                             | 672                                                       | 12                          | 1680                                                      | 30                          | 2240                                                      | 40                          | 3360                                                      | 60                          | 33600            | 32928                  | 11903.33333      | 8332.333333            | 47.42201064                           | 2.258190983           | 14.64216936 | 131.7795242 |
| Alaska  | 2017      | 1099                                | 0.25                             | 4895                                | 0.17                             | 0.07279344859                  | 0.001                             | 87.92                                                     | 6.4                         | 219.8                                                     | 16                          | 293.0666667                                               | 21.33333333                 | 439.6                                                     | 32                          | 4396             | 3297                   | 28794.11765      | 23899.11765            | 1.655458607                           | 2.694177732           | 1203.046171 | 151.4067397 |
| Texas   | 2017      | 22940                               | 0.16                             | 30460                               | 0.47                             | 0.02262423714                  | 0.001                             | 2867.5                                                    | 64.875                      | 7168.75                                                   | 162.1875                    | 9558.333333                                               | 216.25                      | 14337.5                                                   | 324.375                     | 143375           | 120435                 | 64808.51064      | 34348.51064            | 42.07518676                           | 9.037426133           | 68.03002213 | 280.8690545 |
