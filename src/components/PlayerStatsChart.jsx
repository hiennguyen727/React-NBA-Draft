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
    },
  ];

  const layout = {
    title: 'Player Stats',
    xaxis: { title: 'Stats' },
    yaxis: { title: 'Value', range: [40, Math.max(40, ...statsData) + 10] }, // Set a minimum y-axis value of 40
  };

  return <Plot data={data} layout={layout} />;
}

export default PlayerStatsChart;
