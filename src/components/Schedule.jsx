import React, { Component } from 'react';
import '../NbaGamesBar.css';

class NBAGamesBar extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      selectedDate: "2022-10-13",
    };
  }

  async componentDidMount() {
    this.fetchGames();
  }

  async fetchGames() {
    try {
      const { selectedDate } = this.state;
      const apiUrl = `https://www.balldontlie.io/api/v1/games?start_date=${selectedDate}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const games = data.data.slice(0, 8);
        this.setState({ games });
      } else {
        console.error("Error fetching games:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  handleDateChange(event) {
    this.setState({ selectedDate: event.target.value }, () => {
      this.fetchGames();
    });
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  render() {
    const { games, selectedDate } = this.state;

    return (
      <div className="games-bar-container">
        <div className="date-selector">
          <label>Select Date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => this.handleDateChange(e)}
          />
        </div>
        <div className="games-bar" style={{ borderRadius: "20px" }}>
          {games.map((game, index) => (
            <div key={game.id} className="game-card" style={{ borderRadius: "20px" }}>
              <p style={{ fontStyle: "bold" }}>Date: {this.formatDate(game.date)}</p>

              <p>
                {game.home_team.full_name} {game.home_team_score} - {game.visitor_team.full_name} {game.visitor_team_score}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NBAGamesBar;
