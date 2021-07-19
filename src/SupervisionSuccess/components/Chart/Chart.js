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
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import transformChartDataToText from "../../utils/transformChartAsText";
import useIsMobile from "../../utils/useIsMobile";

import "./Chart.scss";

const VERTICAL_OFFSET = 0.05;
export const BASELINE_COLOR = "#ee3007";
export const TOTAL_POPULATION_COLOR = "#2b649c";
export const TRANSPARENT_COLOR = "transparent";
const TOOLTIP_BG_COLOR = "#091e32";
export const CONNECTING_LINE_COLOR = "#07aded";

const Chart = ({ isError, data, startYear, isNotAvailable2020 }) => {
  const isMobile = useIsMobile();
  const [redraw, setRedraw] = useState(false);

  useEffect(() => {
    setRedraw(true);
    setTimeout(() => {
      setRedraw(false);
    }, 500);
  }, [isNotAvailable2020]);

  const { chartData, minY, maxY } = useMemo(() => {
    if (isError) return { chartData: null, minY: null, maxY: null };
    return data.reduce(
      (acc, { month, baseline, totalPopulation, max, min }, index) => {
        const year = month / 12 + startYear;
        const isYear = Number.isInteger(year);

        acc.chartData.datasets[0].data.push(Math.round(totalPopulation));
        acc.chartData.datasets[1].data.push(Math.round(baseline));

        if (year === 2020 && isNotAvailable2020) {
          acc.chartData.labels.push(isYear ? [year, "No Data"] : "");
        } else {
          acc.chartData.labels.push(isYear ? year : "");
        }

        if (isNotAvailable2020) {
          if (index >= 13 && index <= 17) {
            acc.chartData.datasets[0].data.pop();
            acc.chartData.datasets[0].data.push(acc.chartData.datasets[0].data[index - 1]);

            acc.chartData.datasets[1].data.pop();
            acc.chartData.datasets[1].data.push(acc.chartData.datasets[1].data[index - 1]);
          }

          if (index >= 18 && index <= 23) {
            acc.chartData.datasets[0].data.pop();
            acc.chartData.datasets[0].data.push(null);

            acc.chartData.datasets[1].data.pop();
            acc.chartData.datasets[1].data.push(null);
          }
        }

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
        acc.maxY = Math.round(max);
        acc.minY = Math.round(min);
        return acc;
      },
      {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "totalPopulation",
              data: [],
              pointBackgroundColor: [],
              pointBorderColor: [],
              borderColor: TOTAL_POPULATION_COLOR,
              backgroundColor: TOTAL_POPULATION_COLOR,
              borderWidth: isMobile ? 1 : 2,
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
            {
              label: "baseline",
              data: [],
              pointBackgroundColor: [],
              pointBorderColor: [],
              borderColor: BASELINE_COLOR,
              backgroundColor: BASELINE_COLOR,
              borderWidth: isMobile ? 1 : 2,
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
          ],
        },
        min: Infinity,
        max: -Infinity,
      }
    );
  }, [isMobile, startYear, isNotAvailable2020, isError, data]);

  const chartOptions = useMemo(
    () => ({
      spanGaps: true,
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
              suggestedMax: maxY + (maxY - minY) * VERTICAL_OFFSET,
              suggestedMin: minY - (maxY - minY) * VERTICAL_OFFSET,
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
          title: ([totalPopulation, baseline]) =>
            baseline && totalPopulation && `${totalPopulation.value - baseline.value} people`,
          label: () => null,
          footer: ([baseline]) =>
            baseline && baseline.label > startYear + 1
              ? `${baseline.label - (startYear + 1)} year${
                  baseline.label - (startYear + 1) === 1 ? "" : "s"
                }`
              : "",
        },
      },
    }),
    [isMobile, startYear, minY, maxY]
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

  const drawNoDataBackgroundPlugin = {
    beforeDraw: (chart) => {
      const meta = chart.getDatasetMeta(1);
      if (isNotAvailable2020 && meta.data.length) {
        const { ctx, chartArea } = chart;

        const patternCanvas = document.createElement("canvas");
        const pctx = patternCanvas.getContext("2d", { antialias: true });
        const color = "lightgray";

        const CANVAS_SIDE_LENGTH = 15;
        const WIDTH = CANVAS_SIDE_LENGTH;
        const HEIGHT = CANVAS_SIDE_LENGTH;
        const DIVISIONS = 10;

        patternCanvas.width = WIDTH;
        patternCanvas.height = HEIGHT;
        pctx.fillStyle = color;

        // Top line
        pctx.beginPath();
        pctx.moveTo(0, HEIGHT * (1 / DIVISIONS));
        pctx.lineTo(WIDTH * (1 / DIVISIONS), 0);
        pctx.lineTo(0, 0);
        pctx.lineTo(0, HEIGHT * (1 / DIVISIONS));
        pctx.fill();

        // Middle line
        pctx.beginPath();
        pctx.moveTo(WIDTH, HEIGHT * (1 / DIVISIONS));
        pctx.lineTo(WIDTH * (1 / DIVISIONS), HEIGHT);
        pctx.lineTo(0, HEIGHT);
        pctx.lineTo(0, HEIGHT * ((DIVISIONS - 1) / DIVISIONS));
        pctx.lineTo(WIDTH * ((DIVISIONS - 1) / DIVISIONS), 0);
        pctx.lineTo(WIDTH, 0);
        pctx.lineTo(WIDTH, HEIGHT * (1 / DIVISIONS));
        pctx.fill();

        // Bottom line
        pctx.beginPath();
        pctx.moveTo(WIDTH, HEIGHT * ((DIVISIONS - 1) / DIVISIONS));
        pctx.lineTo(WIDTH * ((DIVISIONS - 1) / DIVISIONS), HEIGHT);
        pctx.lineTo(WIDTH, HEIGHT);
        pctx.lineTo(WIDTH, HEIGHT * ((DIVISIONS - 1) / DIVISIONS));
        pctx.fill();

        ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
        ctx.fillRect(
          meta.data[6]._model.x,
          chartArea.top,
          meta.data[24]._model.x - meta.data[12]._model.x,
          chartArea.bottom - chartArea.top
        );
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
            plugins={[drawLinePlugin, drawNoDataBackgroundPlugin]}
            width={560}
            height={isMobile ? 450 : 340}
            redraw={redraw}
          />
        )}
      </div>
    </div>
  );
};

Chart.defaultProps = {
  isError: false,
  isNotAvailable2020: false,
};

Chart.propTypes = {
  isError: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      baseline: PropTypes.number,
      totalPopulation: PropTypes.number,
      max: PropTypes.number,
      min: PropTypes.number,
    })
  ).isRequired,
  startYear: PropTypes.number.isRequired,
  isNotAvailable2020: PropTypes.bool,
};

export default Chart;
