import React, { useState, useEffect } from 'react';
import '../App.css';
import PlayerStatsChart from './PlayerStatsChart.jsx'; 

function Draftpage() {
  const [NbaSearch, setNbaSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [myTeam1, setMyTeam1] = useState([]);
  const [myTeam2, setMyTeam2] = useState([]);
  const [isMockDrafting, setIsMockDrafting] = useState(false);
  const [timer, setTimer] = useState(90);

  useEffect(() => {
    let countdownInterval;

    if (isMockDrafting) {
      countdownInterval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setIsMockDrafting(false);
          clearInterval(countdownInterval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isMockDrafting, timer]);

  const getPlayers = async (searchTerm) => {
    try {
      setNbaSearch([]);
      setPlayerStats(null);

      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNbaSearch(data.data);

        if (data.data.length > 0) {
          getPlayerStats(data.data[0].id);
        }
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getPlayerStats = async (playerId) => {
    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlayerStats(data.data[0]);
      } else {
        console.error('Failed to fetch player stats');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      getPlayers(searchTerm);
    }
  };

  const addToMyTeam = async (player) => {
    if (myTeam1.length <= myTeam2.length) {
      setMyTeam1([...myTeam1, player]);
    } else {
      setMyTeam2([...myTeam2, player]);
    }

    await getPlayerStats(player.id);
  };

  const startMockDraft = () => {
    setIsMockDrafting(true);
    setTimer(90);
  };

  const endTurn = () => {
    setTimer(90);
  };

  return (
    <div className="container">
      <div className="search-container">
        <div>
          <h1>SEARCH YOUR PLAYERS</h1>
          <input
            className="inputsize"
            type="text"
            placeholder="Search for an NBA player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="searchbutton1">
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="results">
          {NbaSearch.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-info">
                <h3>
                  {player.first_name} {player.last_name}
                </h3>
                <button onClick={() => addToMyTeam(player)}>Add to My Team</button>
              </div>
              <div className="player-stats">
                <p>Team: {player.team.full_name}</p>
                <p>Position: {player.position}</p>
                <p>Weight: {player.weight_pounds}</p>
                <p>
                  Height: {player.height_feet},{player.height_inches}
                </p>
                {playerStats && playerStats.player_id === player.id && (
                  <div>
                    <h4>Player Stats</h4>
                    {/* Display stats chart using PlayerStatsChart */}
                    <PlayerStatsChart playerStats={playerStats} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mock-draft-button">
        {!isMockDrafting ? (
          <button onClick={startMockDraft}>START MOCK DRAFT</button>
        ) : (
          <div>
            <p>Time Remaining: {timer} seconds</p>
            <p>Mock Draft in progress...</p>
            <button onClick={endTurn}>End Turn</button>
          </div>
        )}
      </div>

      <div className="my-teams">
        <div className="my-team">
          <h2>My Team 1</h2>
          {myTeam1.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-info">
                <h3>
                  {player.first_name} {player.last_name}
                </h3>
              </div>
              <div className="player-stats">
                <p>Team: {player.team.full_name}</p>
                <p>Position: {player.position}</p>
                <p>Weight: {player.weight_pounds}</p>
                <p>
                  Height: {player.height_feet},{player.height_inches}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="my-team">
          <h2>My Team 2</h2>
          {myTeam2.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-info">
                <h3>
                  {player.first_name} {player.last_name}
                </h3>
              </div>
              <div className="player-stats">
                <p>Team: {player.team.full_name}</p>
                <p>Position: {player.position}</p>
                <p>Weight: {player.weight_pounds}</p>
                <p>
                  Height: {player.height_feet},{player.height_inches}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Draftpage;
