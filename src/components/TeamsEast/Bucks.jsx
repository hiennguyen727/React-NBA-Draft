import React, { useState, useEffect } from "react";
import '../../Roster.css'; 
import Navbar from '../Navbar';
import Footer from '../Footer';
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import { useTime } from "../DateTimeContext";
const TeamRoster = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { time } = useTime();
  useEffect(() => {
    const apiUrl = "https://www.balldontlie.io/api/v1/games?team_ids[]=17&start_date=2022-12-01&end_date=2023-05-31";

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

  return (
    <>
      <Navbar/>
      <div className="info-container" style={{backgroundColor:"#D3D3D3"}}>
              <p>Current Time: {time}</p>
            </div>
      <div className="team-roster">
        <Row>
          {games.map((game, index) => (
            <Col key={index} lg={4} md={6} sm={12}>
              <Card className="game-card" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Date: {formatDate(game.date)}</Card.Title>
                  <Card.Text>Home Team: {game.home_team.full_name}</Card.Text>
                  <Card.Text>Away Team: {game.visitor_team.full_name}</Card.Text>
                  <Card.Text>Score: {game.home_team_score} - {game.visitor_team_score}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer/>
    </>
  );
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default TeamRoster;
