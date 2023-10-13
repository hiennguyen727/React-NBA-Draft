import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../NbaTeamsList.css';
import Navbar from './Navbar';
import { useTime } from "./DateTimeContext";

const NBATeamsList = () => {
  const [teams, setTeams] = useState([]);
  const { time } = useTime();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = 'https://www.balldontlie.io/api/v1/teams';
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          const teams = data.data;
          setTeams(teams);
        } else {
          console.error('Error fetching teams:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Navbar />
      <div className="info-container" style={{ backgroundColor: "#D3D3D3" }}>
        <p>Current Time: {time}</p>
      </div>
      <div
        style={{
          backgroundImage: "url('smokywhite.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "black"
        }}
        className="teams-container"
      >
        <div className="west-teams">
          <h2>Western Conference (West)</h2>
          <ul>
            {teams
              .filter((team) => team.conference === 'West')
              .map((team) => (
                <li key={team.id}>
                  <Link to={`/teams/${team.name}`}>{team.full_name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="east-teams">
          <h2>Eastern Conference (East)</h2>
          <ul>
            {teams
              .filter((team) => team.conference === 'East')
              .map((team) => (
                <li key={team.id}>
                  <Link to={`/teams/${team.name}`}>{team.full_name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NBATeamsList;
