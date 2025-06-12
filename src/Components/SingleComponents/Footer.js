import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-style-one bg-dark text-light">
                    <div className="row">
                        {/* Single Item: About Us */}
                        <div className="col-lg-3 col-md-6 footer-item mt-50">
                            <div className="f-item about">
                                <h4 className="widget-title">About Us</h4>
                                <p> 
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ipsum neque odio error ea adipisci odit qui maxime, aliquid necessitatibus.
                
                                     </p>
                                <ul className="footer-social">
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Single Item: Explore */}
                        <div className="col-lg-3 col-md-6 mt-50 footer-item pl-50 pl-md-15 pl-xs-15">
                            <div className="f-item link">
                                <h4 className="widget-title">Explore</h4>
                                <ul>
                                    <li>
                                        <Link to="/about-us">Company Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/about-us">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">Help Center</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">Career</Link>
                                    </li>
                                    <li>
                                        <Link to="/about-us">Features</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Single Item: Contact Info */}
                        <div className="col-lg-3 col-md-6 footer-item mt-50">
                            <div className="f-item contact">
                                <h4 className="widget-title">Contact Info</h4>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="content">
                                        Kazlıçeşme, Zerujport AVM, Asım Kazancıgil Cd. no:22, 34025 Zeytinburnu/İstanbul
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="content">
                                            <a href="tel:+902125820541">0 212 582 0541</a> <br />
                                            <a href="tel:+902125820541">0 212 582 0541</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="content">
                                            <a href="mailto:info@mazina.com.tr">info@mazina.com.tr</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Single Item: Newsletter */}
                        <div className="col-lg-3 col-md-6 footer-item mt-50">
                            <h4 className="widget-title">Newsletter</h4>
                            <p>
                                Join our subscribers list to get the latest news and special offers.
                            </p>
                            <div className="f-item newsletter">
                                <form action="#">
                                    <input type="email" placeholder="Your Email" className="form-control" name="email" />
                                    <button type="submit">
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                            <fieldset>
                                <input type="checkbox" id="privacy" name="privacy" />
                                <label htmlFor="privacy">I agree to the Privacy Policy</label>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom text-light">
                <div className="footer-bottom-shape">
                    <img src="assets/img/shape/9.png" alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="footer-logo">
                                <img src="assets/img/mazina.png" alt="Logo" />
                            </div>
                        </div>
                        <div className="col-lg-6 text-end">
                            <p>© Copyright 2024 Mazina. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
