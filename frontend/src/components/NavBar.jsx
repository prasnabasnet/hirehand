import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling   

const NavBar = () => {
    return (                                                                                                                                                            
        <nav className="navbar">                                                                                                                                           
            <ul className="nav-list">                                                                                                                                   
                <li className="nav-item">                                                                                                                               
                    <Link to="/" className="nav-link">Home</Link>                                                                                                         
                </li>                                                                                                                                               
                <li className="nav-item">                                                                                                                               
                    <Link to="/about" className="nav-link">About</Link>                                                                                                   
                </li>                                                                                                                                              
            </ul>                                                                                                                                              
        </nav>                                                                                                                                              
    );                                                                                                                                                      
};