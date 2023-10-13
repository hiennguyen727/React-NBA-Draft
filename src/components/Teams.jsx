import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../NbaTeamsList.css';
import Navbar from './Navbar';

const NBATeamsList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = 'https://www.balldontlie.io/api/v1/teams';
        const response = await axios.get(apiUrl);
        const teams = response.data.data;
        setTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{
      backgroundImage: "url('smokywhite.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      color: "black"}}  className="teams-container">
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
