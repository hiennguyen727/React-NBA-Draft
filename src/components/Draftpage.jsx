import React, { useState, useEffect } from "react";
import PlayerStatsChart from "./PlayerStatsChart.jsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Draftpage.css"; // Import custom CSS for styling
import Navbar from "./Navbar.jsx";
import { useTime, DateTimeProvider } from "./DateTimeContext"; // Import the time context and DateTimeProvider

function Draftpage() {
  const [NbaSearch, setNbaSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playerStats, setPlayerStats] = useState(null);
  const [myTeam1, setMyTeam1] = useState(new Array(10).fill(null));
  const [myTeam2, setMyTeam2] = useState(new Array(10).fill(null));
  const [isMockDrafting, setIsMockDrafting] = useState(false);
  const [timer, setTimer] = useState(90);
  const { time } = useTime(); // Access the time from the context

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
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
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
        console.error("Failed to fetch player stats");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      getPlayers(searchTerm);
    }
  };

  const addToMyTeam = async (player) => {
    if (myTeam1.length <= 10 && myTeam1.every((p) => p !== player)) {
      const updatedTeam1 = [...myTeam1];
      const emptySlotIndex = updatedTeam1.findIndex((p) => p === null);
      if (emptySlotIndex !== -1) {
        updatedTeam1[emptySlotIndex] = player;
        setMyTeam1(updatedTeam1);
        await getPlayerStats(player.id);
      }
    } else if (myTeam2.length <= 10 && myTeam2.every((p) => p !== player)) {
      const updatedTeam2 = [...myTeam2];
      const emptySlotIndex = updatedTeam2.findIndex((p) => p === null);
      if (emptySlotIndex !== -1) {
        updatedTeam2[emptySlotIndex] = player;
        setMyTeam2(updatedTeam2);
        await getPlayerStats(player.id);
      }
    }
  };

  const startMockDraft = () => {
    setIsMockDrafting(true);
    setTimer(90);
  };

  const endTurn = () => {
    setTimer(90);
  };

  return (
    <div className="dark-bg draftPage">
      <Navbar />
      <Container className="mt-4">
        <h1 id="searchyourplayers"> 🏀 DRAFT PAGE 🏀</h1>
        <div className="mb-4" id="hollup">
          <input
            className="input123"
            type="text"
            placeholder="Search for an NBA player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p>Current Time: {time}</p> {/* Display the current time from the context */}
          <Button
            variant="orange" // Custom CSS class for NBA color
            onClick={handleSearch}
            className="ml-2 btn-orange"
          >
            Search
          </Button>
          <div className="mock-draft-button">
            {!isMockDrafting ? (
              <Button
                variant="success"
                onClick={startMockDraft}
                className="btn-start-draft"
                id="startdraftbtn"
              >
                START MOCK DRAFT
              </Button>
            ) : (
              <div>
                <p>Time Remaining: {timer} seconds</p>
                <p>Mock Draft in progress...</p>
                <Button
                  variant="danger"
                  onClick={endTurn}
                  className="btn-end-turn"
                >
                  End Turn
                </Button>
              </div>
            )}
          </div>
        </div>
        <Row>
          <Col md={6}>
            <div className="results">
              {NbaSearch.map((player) => (
                <Card key={player.id} className="mb-3">
                  <Card.Body>
                    <div className="nbacardname">
                      <h5>
                        {player.first_name} {player.last_name}
                      </h5>
                    </div>
                    <div className="nbacardname">
                      <p>Team: {player.team.full_name}</p>
                    </div>
                    <Button
                      variant="orange" // Custom CSS class for NBA color
                      onClick={() => addToMyTeam(player)}
                      className="btn-add-to-team"
                    >
                      Add to My Team
                    </Button>
                    <PlayerStatsChart playerStats={playerStats} />
                    {playerStats && playerStats.player_id === player.id && (
                      <div>
                        <h4>Player Stats</h4>
                        {/* Display stats chart using PlayerStatsChart */}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <div className="my-team">
                  <h2 style={{color:"black"}}>Team 1</h2>
                  {myTeam1.map((player, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        {player ? (
                          <>
                            <h5 className="nbacardname">
                              {player.first_name} {player.last_name}
                            </h5>
                            <p className="nbacardname">
                              Position: {player.position}
                            </p>
                          </>
                        ) : (
                          "Empty Slot"
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Col>
              <Col>
                <div className="my-team">
                  <h2 style={{color:"black"}}>Team 2</h2>
                  {myTeam2.map((player, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        {player ? (
                          <>
                            <h5>
                              {player.first_name} {player.last_name}
                            </h5>
                            <p>Position: {player.position}</p>
                          </>
                        ) : (
                          "Empty Slot"
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Draftpage;
