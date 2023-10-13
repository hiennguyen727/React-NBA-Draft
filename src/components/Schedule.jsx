import React, { Component } from 'react';
import axios from 'axios';
import '../NbaGamesBar.css';

class NBAGamesBar extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      selectedDate: "2022-10-13", // Default date
    };
  }

  async componentDidMount() {
    this.fetchGames();
  }

  // Function to fetch games based on the selected date
  async fetchGames() {
    try {
      const { selectedDate } = this.state;
      const apiUrl = `https://www.balldontlie.io/api/v1/games?start_date=${selectedDate}`;
      const response = await axios.get(apiUrl);

      // Limit to a maximum of 8 games
      const games = response.data.data.slice(0, 8);

      this.setState({ games });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  // Function to handle date selection
  handleDateChange(event) {
    this.setState({ selectedDate: event.target.value }, () => {
      this.fetchGames();
    });
  }

  // Function to format the date to "Month Day, Year"
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
        <div className="games-bar" style={{borderRadius: "20px"}}>
          {games.map((game, index) => (
            <div key={game.id} className="game-card"style={{borderRadius: "20px"}}>
              <p style={{fontStyle:"bold"}} >Date: {this.formatDate(game.date)}</p>
             
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
