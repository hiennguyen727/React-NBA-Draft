import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Schedule from "./Schedule";
import { useTime } from "./DateTimeContext"; // Import the time context

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const { time } = useTime(); // Access the time from the context

  // Your API URL and options
  const url = "https://nba-latest-news.p.rapidapi.com/articles";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e996a1879dmshdbc548a3916aeeap1009ffjsnd2dd76ae7730",
      "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch articles. Status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const limitedArticles = articles.slice(0, 10);

  return (
    <div>
      <Navbar />
      <Schedule />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="articles-container" style={{ width: "100%", textAlign: "center" }}>
              <div className="carousel-title-bar">
                <h2 id="articleheader">NBA Latest News Articles</h2>
              </div>
              <Carousel style={{ background: "linear-gradient(to bottom, red, white)", padding: "20px" }}>
                {limitedArticles.map((article, index) => (
                  <Carousel.Item key={index}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <Card style={{ width: "30rem", marginBottom: "20px" }}>
                        <Card.Img src={`/${index + 1}.jpg`} alt="Article Image" style={{ height: "400px", objectFit: "cover" }} />
                        <Card.Body>
                          <Card.Title>{article.title}</Card.Title>
                          <Card.Text>{article.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-container">
              <p>Current Time: {time}</p> {/* Display the current time from the context */}
            </div>
            <div className="info-container">
             
              <p>Welcome to the unofficial NBA fan website, your ultimate destination for all things basketball. Dive into the heart of the action with the latest news, player stats, and team schedules. Stay updated with our real-time game schedule, featuring live scoring and a live mock fantasy draft. Explore in-depth player profiles and track your favorite athletes as they compete on the court.  Whether you're a die-hard fan or a casual enthusiast, the NBA website is your front-row seat to the excitement of professional basketball. Let's shoot some hoops and celebrate the game we love!</p>
            </div>
            {/* New info container 1 - Follow NBA Socials */}
            <div className="info-container">
              <h3>Follow NBA Socials</h3>
              <p>Stay updated with NBA on social media!</p>
              <img  src="/icons.jpeg"/>
            </div>
            {/* New info container 2 - Fake Payment System */}
            <div className="info-container">
              <h3>NBA Pass</h3>
              <p>Subscribe to NBA Pass for exclusive content.</p>
              {/* Add payment system UI */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
