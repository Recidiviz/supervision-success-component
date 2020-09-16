import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import "./Chart.css";

const VERTICAL_OFFSET = 0.05;

const Chart = ({ data }) => {
  const { chartData, min, max } = useMemo(
    () =>
      data.reduce(
        (acc, { month, baseline, totalPopulation }) => {
          acc.chartData.labels.push(month);
          acc.chartData.datasets[0].data.push(Math.round(baseline));
          acc.chartData.datasets[1].data.push(Math.round(totalPopulation));
          if (baseline > acc.max || totalPopulation > acc.max) {
            acc.max = Math.max(baseline, totalPopulation);
          }
          if (baseline < acc.min || totalPopulation < acc.min) {
            acc.min = Math.min(baseline, totalPopulation);
          }
          return acc;
        },
        {
          chartData: {
            labels: [],
            datasets: [
              {
                label: "baseline",
                data: [],
                borderColor: "#ee3007",
                backgroundColor: "#ee3007",
                fill: false,
              },
              {
                label: "totalPopulation",
                data: [],
                borderColor: "#2b649c",
                backgroundColor: "#2b649c",
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
        intersect: false,
        mode: "index",
        backgroundColor: "#091e32",
        titleFontSize: 14,
        titleAlign: "center",
        footerFontStyle: "400",
        footerAlign: "center",
        caretSize: 0,
        xPadding: 20,
        yPadding: 10,
        callbacks: {
          title: ([baseline, totalPopulation]) =>
            `${totalPopulation.value - baseline.value} people`,
          label: () => null,
          footer: ([baseline]) => `${baseline.label} months`,
        },
      },
    }),
    [min, max]
  );

  const drawLinePlugin = {
    afterDraw: function (chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const [firstPoint, secondPoint] = chart.controller.tooltip._active;
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
        ctx.strokeStyle = "#07aded";
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
