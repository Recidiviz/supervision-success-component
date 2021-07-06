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
/* eslint-disable no-underscore-dangle */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import transformChartDataToText from "../../utils/transformChartAsText";
import useIsMobile from "../../utils/useIsMobile";

import "./Chart.scss";

const VERTICAL_OFFSET = 0.05;
const Y_AXIS_OFFSET = 3;
export const BASELINE_COLOR = "#ee3007";
export const TOTAL_POPULATION_COLOR = "#2b649c";
export const TRANSPARENT_COLOR = "transparent";
const TOOLTIP_BG_COLOR = "#091e32";
export const CONNECTING_LINE_COLOR = "#07aded";

const Chart = ({ isError, data }) => {
  const isMobile = useIsMobile();
  const { chartData, min, max } = useMemo(() => {
    if (isError) return { chartData: null, min: null, max: null };
    return data.reduce(
      (acc, { month, baseline, totalPopulation }) => {
        const startYear = 2019;
        const year = month / 12 + startYear;
        const isYear = Number.isInteger(year);

        acc.chartData.datasets[0].data.push(Math.round(totalPopulation));
        acc.chartData.datasets[1].data.push(Math.round(baseline));
        acc.chartData.labels.push(isYear ? year : "");

        if (isYear && !isMobile) {
          acc.chartData.datasets[0].pointBackgroundColor.push(TOTAL_POPULATION_COLOR);
          acc.chartData.datasets[0].pointBorderColor.push(TOTAL_POPULATION_COLOR);
          acc.chartData.datasets[1].pointBackgroundColor.push(BASELINE_COLOR);
          acc.chartData.datasets[1].pointBorderColor.push(BASELINE_COLOR);
        } else {
          acc.chartData.datasets[0].pointBackgroundColor.push(TRANSPARENT_COLOR);
          acc.chartData.datasets[0].pointBorderColor.push(TRANSPARENT_COLOR);
          acc.chartData.datasets[1].pointBackgroundColor.push(TRANSPARENT_COLOR);
          acc.chartData.datasets[1].pointBorderColor.push(TRANSPARENT_COLOR);
        }
        acc.max = Math.round(Math.max(baseline, totalPopulation, acc.max));
        acc.min = Math.round(Math.min(baseline, totalPopulation, acc.min));
        return acc;
      },
      {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "baseline",
              data: [],
              pointBackgroundColor: [],
              pointBorderColor: [],
              borderColor: TOTAL_POPULATION_COLOR,
              backgroundColor: TOTAL_POPULATION_COLOR,
              borderWidth: isMobile ? 1 : 2,
              fill: false,
            },
            {
              label: "totalPopulation",
              data: [],
              pointBackgroundColor: [],
              pointBorderColor: [],
              borderColor: BASELINE_COLOR,
              backgroundColor: BASELINE_COLOR,
              borderWidth: isMobile ? 1 : 2,
              fill: false,
            },
          ],
        },
        min: Infinity,
        max: -Infinity,
      }
    );
  }, [isMobile, isError, data]);

  const chartOptions = useMemo(
    () => ({
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: false,
            ticks: {
              padding: 20,
              fontSize: isMobile ? 12 : 16,
              precision: 0,
              suggestedMax: min === max ? max + Y_AXIS_OFFSET : max + (max - min) * VERTICAL_OFFSET,
              suggestedMin: min === max ? max - Y_AXIS_OFFSET : min - (max - min) * VERTICAL_OFFSET,
              maxTicksLimit: 7,
              callback: (value) => value.toLocaleString(),
            },
          },
        ],
        xAxes: [
          {
            gridLines: false,
            ticks: { fontSize: isMobile ? 12 : 16, padding: 20, minRotation: 0, maxRotation: 0 },
          },
        ],
      },
      tooltips: {
        enabled: !isMobile, // Disables tooltips on mobile because touch screens make interaction inconsistent
        filter: ({ index }) => index % 12 === 0,
        intersect: false,
        mode: "index",
        backgroundColor: TOOLTIP_BG_COLOR,
        titleFontSize: 14,
        titleAlign: "center",
        footerFontStyle: "400",
        footerAlign: "center",
        caretSize: 0,
        xPadding: 20,
        yPadding: 10,
        callbacks: {
          title: ([baseline, totalPopulation]) =>
            baseline && totalPopulation && `${totalPopulation.value - baseline.value} people`,
          label: () => null,
          footer: ([baseline]) =>
            baseline && `${baseline.label} year${baseline.label === 1 ? "" : "s"}`,
        },
      },
    }),
    [isMobile, min, max]
  );

  const drawLinePlugin = {
    afterDraw(chart) {
      // Disables the dotted line on mobile because touch screens make interaction inconsistent
      if (!isMobile && chart.tooltip._active && chart.tooltip._active.length) {
        const [firstPoint, secondPoint] = chart.controller.tooltip._active;
        if (firstPoint._index % 12 !== 0) return;
        const topY = Math.max(firstPoint._model.y, secondPoint._model.y);
        const bottomY = Math.min(firstPoint._model.y, secondPoint._model.y);
        if (topY === bottomY) return;
        const { x } = firstPoint._model;
        const { ctx } = chart;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY - 5);
        ctx.lineTo(x, bottomY + 5);
        ctx.setLineDash([10, 2]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = CONNECTING_LINE_COLOR;
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  return (
    <div className="chart">
      <div className="chart_heading">Total people in prison projected in years</div>
      <div
        className="chart_chart"
        tabIndex={-1}
        role="img"
        aria-label={
          isError ? "Chart is unavailable" : transformChartDataToText(chartData.datasets[1].data)
        }
      >
        {isError ? null : (
          <Line
            data={chartData}
            options={chartOptions}
            plugins={[drawLinePlugin]}
            width={560}
            height={isMobile ? 450 : 340}
          />
        )}
      </div>
    </div>
  );
};

Chart.defaultProps = {
  isError: false,
};

Chart.propTypes = {
  isError: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      baseline: PropTypes.number,
      totalPopulation: PropTypes.number,
    })
  ).isRequired,
};

export default Chart;
