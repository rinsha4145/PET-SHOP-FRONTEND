import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-section">
          <h4>About your pets</h4>
          <ul>
            <li><a href="#">Pets Grooming</a></li>
            <li><a href="#">Pet insurance</a></li>
            <li><a href="#">Veterinary surgeries</a></li>
            <li><a href="#">Free kids workshops</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About us</h4>
          <ul>
            <li><a href="#">About Pets at Home</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Responsibility</a></li>
            <li><a href="#">Responsible retailing</a></li>
            <li><a href="#">Responsible pet sourcing</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Join our Pets Club</h4>
          <ul>
            <li><a href="#">Personalised offers & savings</a></li>
            <li><button className="join-now">Join now</button></li>
          </ul>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© All rights reserved.</p>
        <ul>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Privacy policy</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Modern Slavery Statement</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
