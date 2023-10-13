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
      text: statsData.map((value) => value.toFixed(2)), 
      textposition: 'bottom center',
    },
  ];

  const layout = {
    title: 'Player Stats',
    xaxis: { title: 'Stats' },
    yaxis: { title: 'Value', range: [0, 40] }, 
    plot_bgcolor: 'transparent', 
    paper_bgcolor: '#EEEEEE', 
  };

  const config = {
    displayModeBar: false, 
  };

  return <Plot data={data} layout={layout} config={config} />;
}

export default PlayerStatsChart;
