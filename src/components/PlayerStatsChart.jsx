import React from 'react';
import Plot from 'react-plotly.js';

function PlayerStatsChart({ playerStats }) {
  if (!playerStats) {
    return null;
  }

  const statsLabels = ['PPG', 'AST', 'BLK', 'STL', 'TO', 'REB'];
  const statsData = [
    playerStats.pts,
    playerStats.ast,
    playerStats.blk,
    playerStats.stl,
    playerStats.turnover,
    playerStats.reb,
  ];

  const data = [
    {
      x: statsLabels,
      y: statsData,
      type: 'bar',
      marker: { color: ['blue', 'green', 'red', 'purple', 'orange', 'pink'] },
      text: statsData.map((value) => value.toFixed(2)), // Add values as text under the bars
      textposition: 'bottom center',
    },
  ];

  const layout = {
    title: 'Player Stats',
    xaxis: { title: 'Stats' },
    yaxis: { title: 'Value', range: [0, 40] }, // Set the y-axis range from 0 to 40
    plot_bgcolor: 'transparent', // Set the chart background color to transparent
    paper_bgcolor: '#EEEEEE', // Set the chart body background color to black
  };

  const config = {
    displayModeBar: false, // Hide the navigation bar
  };

  return <Plot data={data} layout={layout} config={config} />;
}

export default PlayerStatsChart;
