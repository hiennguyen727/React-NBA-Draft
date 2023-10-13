import React, { useState, useEffect } from "react";
import '../../Roster.css'; // Import your CSS file
import Navbar from '../Navbar'
import Footer from '../Footer'
const TeamRoster = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://www.balldontlie.io/api/v1/games?team_ids[]=3&start_date=2022-12-01&end_date=2023-05-31";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const first10Games = data.data.slice(0, 50);
        setGames(first10Games);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (<>
    <Navbar/>
    <div className="team-roster">
      {games.map((game, index) => (
        <div key={index} className="game-card">
          <div className="game-info">
            <p>Date: {formatDate(game.date)}</p>
            <p>Home Team: {game.home_team.full_name}</p>
            <p>Away Team: {game.visitor_team.full_name}</p>
            <p>Score: {game.home_team_score} - {game.visitor_team_score}</p>
          </div>
        </div>
      ))}
    </div>







    <Footer/></>
  );
};


function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default TeamRoster;
