export const chartData = {
  Visitors: generateChartData(0.6),
  Connections: generateChartData(0.5),
  Interactions: generateChartData(0.7),
  Impressions: generateChartData(0.55),
};

// Function to generate daily data from March 1, 2025, to today's date
function generateChartData(founderRatio) {
  const startDate = new Date("2025-03-01");
  const endDate = new Date();
  let data = [];

  while (startDate <= endDate) {
    const total = Math.floor(Math.random() * 2000) + 200; // 200 - 2500
    const founders = Math.round(total * founderRatio);
    const investors = total - founders;

    data.push({
      date: startDate.toISOString().split("T")[0],
      value: total,
      founders,
      investors,
    });

    startDate.setDate(startDate.getDate() + 1);
  }

  return data;
}
