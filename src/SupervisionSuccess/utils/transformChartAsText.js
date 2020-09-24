const transformChartDataToText = (dataset) => {
  let result = `Initial: ${dataset[0]} people in prison.`;
  if (dataset[12]) result += `After 1st year: ${dataset[12]}`;
  if (dataset[24]) result += ` After 2nd year: ${dataset[24]}.`;
  if (dataset[36]) result += ` After 3rd year: ${dataset[36]}`;
  if (dataset[48]) result += ` After 4th year: ${dataset[48]}`;
  if (dataset[60]) result += ` After 5th year: ${dataset[60]}`;

  return result;
};

export default transformChartDataToText;
