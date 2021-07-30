# Supervision Success

[![Build Status](https://travis-ci.com/Recidiviz/supervision-success-component.svg?branch=main)](https://travis-ci.com/Recidiviz/supervision-success-component)

[![Coverage Status](https://coveralls.io/repos/github/Recidiviz/supervision-success-component/badge.svg?branch=main)](https://coveralls.io/github/Recidiviz/supervision-success-component?branch=main)

A React component powering a miniature web app for exploring the impact of success in supervision on the justice system at large

## Contents

1. [Development](#development)
1. [Params File Format](#params-file-format)

## Development

### Getting set up

1. Grab the source:

   `git clone git@github.com:Recidiviz/supervision-success-component.git`

1. Install Yarn package manager:

   `brew install yarn`

   For alternative Yarn installation options, see [Yarn Installation](https://yarnpkg.com/en/docs/install).

1. Install dependencies:

   `yarn install`

That's it! We suggest installing a linting package for your preferred code editor that hooks into [eslint](#eslint), such as [linter-eslint](https://atom.io/packages/linter-eslint) for Atom.

### Testing and linting

To run tests wired up through react-scripts:

`yarn test --coverage`

Running tests this way will also write code coverage statistics to stdout and the `coverage` directory, which are reported to Coveralls.

To run linting:

`yarn lint`

Linting is done with a combination of `eslint` and `Prettier`. `react-scripts` runs some minimal linting by default as part of its build process; errors on those linting rules would cause build scripts to fail, but errors in the broader [configuration](https://github.com/Recidiviz/supervision-success-component/.eslintrc.json) should not.

To have eslint and Prettier fix violations automatically, run:

`yarn lint --fix`

### Running the app locally

A yarn script is available for starting the development server. The entire app is a React frontend that is served out of port `3000`. This will also automatically open a browser to localhost on the appropriate port, pointing to the frontend.

`yarn start`

The development server will remain active until you either close your terminal or shut down the entire setup at once using `CTRL+c`.

### Creating a build

To generate a build of the frontend that is suitable for deploys, run: `yarn build`.

Each time this is run, the `/build` directory will be wiped clean. A [bundle analysis](#Bundle-analysis) report, found in `build/report.html`, will also be generated on each invocation of this script.

## Params File Format

The `params.csv` file is used as the primary input powering the projection model underlying the app. It lives in `src/params.csv` but could be moved around trivially, or pulled from a CDN or an API, for different deployment styles.

An _example_ of a valid `params.csv` file can be found in [`params.csv`](/src/params.csv).

The first row of the file (the headers) contains revocation model parameters **in fixed order**.

- `State`
- `Revocations Population 2019 [C&C input]`
- `Population Fraction 2019 [C&C input]`
- `Revocations Admissions 2019 [C&C input]`
- `Admissions Fraction 2019 [C&C input]`
- `Revocations Population 2020 [C&C input] *If no data, enter same numbers as 2019*`
- `Population Fraction 2020 [C&C input] *If no data, enter same numbers as 2019*`
- `total cost per inmate [input]`
- `marginal cost per inmate [input]`
- `Number of facilities [input]`
- `state-wide capacity`
- `Total Population 2019`
- `Total Population 2020`
- `New Offense Population 2019`
- `New Offense Population 2020`
- `Total Admissions`
- `New Offense Admissions`
- `New Offense Avg Time Served in Months`
- `Revocations Timescale`
- `N A`
- `R A`
- `N Alpha_0`
- `R Alpha_0`

Each row after the first row should correspond to a single state. There should not be multiple rows with the same `State` value. Each row should include the parameters necessary for accurately modeling revocations within that state.

Example of valid model parameters are included in the example file stored in [`params.csv`](/src/params.csv).
