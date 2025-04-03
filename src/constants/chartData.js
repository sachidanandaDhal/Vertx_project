export const chartData = {
    Visitors: generateChartData(),
    Connections: generateChartData(),
    Interactions: generateChartData(),
    Impressions: generateChartData(),
  };
  
  // Function to generate daily data from March 1, 2025, to today's date
  function generateChartData() {
    const startDate = new Date("2025-03-01"); // Fixed start date
    const endDate = new Date(); // Always today's date
    let data = [];
  
    while (startDate <= endDate) {
      data.push({
        date: startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        value: Math.floor(Math.random() * 2000) + 200, // Random value between 200-2500
      });
      startDate.setDate(startDate.getDate() + 1);
    }
  
    return data;
  }
  