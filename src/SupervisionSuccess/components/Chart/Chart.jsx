import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import "./Chart.scss";

const VERTICAL_OFFSET = 0.05;
export const BASELINE_COLOR = "#ee3007";
export const TOTAL_POPULATION_COLOR = "#2b649c";
export const TRANSPARENT_COLOR = "transparent";
const TOOLTIP_BG_COLOR = "#091e32";
export const CONNECTING_LINE_COLOR = "#07aded";

const Chart = ({ data }) => {
  const { chartData, min, max } = useMemo(
    () =>
      data.reduce(
        (acc, { month, baseline, totalPopulation }) => {
          const year = month / 12;
          const isYear = Number.isInteger(year);
          acc.chartData.datasets[0].data.push(Math.round(baseline));
          acc.chartData.datasets[1].data.push(Math.round(totalPopulation));
          if (isYear) {
            acc.chartData.labels.push(year);
            acc.chartData.datasets[0].pointBackgroundColor.push(BASELINE_COLOR);
            acc.chartData.datasets[0].pointBorderColor.push(BASELINE_COLOR);
            acc.chartData.datasets[1].pointBackgroundColor.push(TOTAL_POPULATION_COLOR);
            acc.chartData.datasets[1].pointBorderColor.push(TOTAL_POPULATION_COLOR);
          } else {
            acc.chartData.labels.push("");
            acc.chartData.datasets[0].pointBackgroundColor.push(TRANSPARENT_COLOR);
            acc.chartData.datasets[0].pointBorderColor.push(TRANSPARENT_COLOR);
            acc.chartData.datasets[1].pointBackgroundColor.push(TRANSPARENT_COLOR);
            acc.chartData.datasets[1].pointBorderColor.push(TRANSPARENT_COLOR);
          }
          acc.max = Math.max(baseline, totalPopulation, acc.max);
          acc.min = Math.min(baseline, totalPopulation, acc.min);
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
                borderColor: BASELINE_COLOR,
                backgroundColor: BASELINE_COLOR,
                fill: false,
              },
              {
                label: "totalPopulation",
                data: [],
                pointBackgroundColor: [],
                pointBorderColor: [],
                borderColor: TOTAL_POPULATION_COLOR,
                backgroundColor: TOTAL_POPULATION_COLOR,
                fill: false,
              },
            ],
          },
          min: Infinity,
          max: -Infinity,
        }
      ),
    [data]
  );

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
              fontSize: 16,
              suggestedMax: max + (max - min) * VERTICAL_OFFSET,
              suggestedMin: min - (max - min) * VERTICAL_OFFSET,
            },
          },
        ],
        xAxes: [
          {
            gridLines: false,
            ticks: { fontSize: 16, padding: 20 },
          },
        ],
      },
      tooltips: {
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
    [min, max]
  );

  const drawLinePlugin = {
    afterDraw: function (chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const [firstPoint, secondPoint] = chart.controller.tooltip._active;
        if (firstPoint._index % 12 !== 0) return;
        const topY = Math.max(firstPoint._model.y, secondPoint._model.y);
        const bottomY = Math.min(firstPoint._model.y, secondPoint._model.y);
        if (topY === bottomY) return;
        const x = firstPoint._model.x;
        const ctx = chart.ctx;
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
      <div className="chart_chart">
        <Line
          data={chartData}
          options={chartOptions}
          plugins={[drawLinePlugin]}
          // TODO(19): Chart should be responsive
          width={560}
          height={400}
        />
      </div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      baseline: PropTypes.number,
      totalPopulation: PropTypes.number,
    })
  ).isRequired,
};

export default Chart;
