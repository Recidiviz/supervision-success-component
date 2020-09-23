# Supervision Success

A React component powering a miniature web app for exploring the impact of success in supervision on the justice system at large

## Contents

1. [Input File Format](w#input-file-format)

## Input File Format

An example of a valid CSV file can be found in [`params.csv`](/src/params.csv).

The first row of the file (the headers) contains the required revocation model parameters, **in any order**.

- `state`
- `newOffensePopulation`
- `revocationA`
- `revocationsTimescale`
- `marginalCostPerInmate`
- `totalCostPerInmate`
- `checkpoint[n]`
- `savings[n]`

Checkpoint and savings columns model the changing amount of savings per person released from incarceration as the
total number of people released passes certain checkpoints, i.e. as the number of people incarcerated decreases
further, the amount of savings per person continues to change.

These columns should be provided in this format:
`checkpoint1`, `savings1` `checkpoint2`, `savings2` `...`, `checkpoint99`, `savings99`

You can provide as many checkpoint and savings columns as you'd like, but the number of each should be equal and
there should be a 1:1 mapping from checkpoint n to savings n.

Any others params that may be useful for calculations also could be in the sheet in any format
(This params are not used in application) e.g.:

- `revocationsPopulation`
- `Population Fraction`
- `totalPopulation`
- `revocationsAdmissions`
- `admissionsFraction`
- `Total Admissions`
- `newOffenseAdmissions`
- `newOffenseAvgTimeServedInYears`
- `newOffenseA`
- `...`

Each row after the first row should correspond to a single state. Each row should include the parameters necessary for 
accurately modeling revocations within that state.

Here are some additional examples of valid model parameters. 

**Note:** these are formatted as a table in Markdown for readability, but these tables are not valid 
CSV and the exact formatting should be provided as described above.

| state   | newOffensePopulation | revocationA | revocationsTimescale | marginalCostPerInmate | totalCostPerInmate | checkpoint1 | savings1 | checkpoint2 | savings2 | checkpoint3 | savings3 |
| ------- | -------------------- | ----------- | -------------------- | --------------------- | ------------------ | ----------- | -------- | ----------- | -------- | ----------- | -------- |
| Texas   | 12000                | 20          | 1.239                | 0.023                 | 0.044              | 599         | 12.3     | 900         | 23.4     | 1500        | 42.55    |
| Alabama | 9004                 | 60          | 1.509                | 0.4                   | 0.53               | 100         | 53.2     | 200         | 59.4     | 1500        | 400.55   |

| state   | totalCostPerInmate | newOffensePopulation | revocationA | revocationsTimescale | marginalCostPerInmate | checkpoint2 | savings2 | checkpoint1 | savings1 | other field |
| ------- | ------------------ | -------------------- | ----------- | -------------------- | --------------------- | ----------- | -------- | ----------- | -------- | ----------- |
| Texas   | 0.004              | 20                   | 1.239       | 0.023                | 12000                 | 900         | 23.4     | 599         | 12.3     | any value   |
| Alabama | 0.53               | 60                   | 1.509       | 0.4                  | 9004                  | 200         | 59.4     | 100         | 53.2     | any value   |
