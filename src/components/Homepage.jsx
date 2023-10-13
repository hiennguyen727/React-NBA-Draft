import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Schedule from "./Schedule";
import { useTime } from "./DateTimeContext";
import Footer from './Footer.jsx';

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const { time } = useTime();

  const url = "https://nba-latest-news.p.rapidapi.com/articles";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e996a1879dmshdbc548a3916aeeap1009ffjsnd2dd76ae7730",
      "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
    },
  };

  const handleClickLeaguePass = () => {
    window.location.href = 'https://buy.stripe.com/test_5kAeXO3pT8tibEQ6oo';
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
              <div className="carousel-title-bar"></div>
              <h2 id="articleheader">NBA Latest News Articles</h2>
              <Carousel style={{ background: "linear-gradient(to bottom, red, white)", padding: "20px", borderRadius: "50px" }}>
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
              <div className="info-container  ">
                <h3>Trending Stories</h3>
                <div style={{ padding: "0px", borderRadius: "5px" }} className="row">
                  {limitedArticles.map((article, index) => (
                    <div className="col-md-6" key={index}>
                      <Card style={{ margin: "0px" }}>
                        <Card.Img src={`/${index + 11}.jpg`} alt="Article Image" style={{ height: "150px", objectFit: "cover" }} />
                        <Card.Body>
                          <Card.Title>{article.title}</Card.Title>
                          <Card.Text>{article.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-container" style={{ backgroundColor: "#D3D3D3" }}>
              <p>Current Time: {time}</p>
            </div>
            <div style={{ backgroundColor: "#D3D3D3", borderRadius: "5px" }} className="info-container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h3>HELLO!!!</h3>
              </div>
              <p>
                Welcome to the unofficial NBA fan website, your ultimate destination for all things basketball.
                Dive into the heart of the action with the latest news, player stats, and team schedules.
                Stay updated with our real-time game schedule, featuring live scoring and a live mock fantasy draft.
                Explore in-depth player profiles and track your favorite athletes as they compete on the court.
                Whether you're a die-hard fan or a casual enthusiast, the NBA website is your front-row seat to the excitement of professional basketball.
                Let's shoot some hoops and celebrate the game we love!
              </p>
            </div>

            <div className="info-container" style={{ justifyContent: "center", backgroundImage: "url('/waves.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "center" }}><h3>NBA Pass</h3></div>
              <p>Subscribe to NBA Pass for exclusive content.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href="https://buy.stripe.com/test_5kAeXO3pT8tibEQ6oo" className="btn btn-primary">BUY HERE</a>
              </div>
            </div>

            <div style={{ backgroundColor: "#D3D3D3" }} className="info-container">
              <h3>Follow NBA Socials</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/icons.jpeg" style={{ width: "400px", height: "240px" }} alt="NBA Social Icons" />
              </div>
            </div>

            <div style={{ backgroundColor: "#8900ff" }} className="info-container">
              <div className="w-full dark:bg-gray-500" style={{ backgroundImage: "url('https://source.unsplash.com/random/640x480'); backgroundPosition: center center; background-blend-mode: multiply; background-size: cover;" }}>
                <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
                  <h1 className="text-5xl antialiased font-semibold leading text-center dark:text-gray-100">Get Our Updates</h1>
                  <p className="pt-2 pb-8 text-xl antialiased text-center dark:text-gray-100">Find out about events and other news</p>
                  <div className="flex flex-row">
                    <input type="text" placeholder="example@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
                    <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-400 dark:text-gray-900">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
           

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
