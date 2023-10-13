import React from "react";
import "../Footer.css"; // Import your custom CSS for styling

const Footer = () => {
  return (
    <footer className="nba-footer">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} NBA Fan Website</p>
        <p>Contact me: hien.d.nguyen1997@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
