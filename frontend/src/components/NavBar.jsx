import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                {/* Logo */}
                <Link to="/" style={styles.logo}>
                    ✦ HireHand
                </Link>

                {/* Desktop Links */}
                <ul style={styles.navList}>
                    <li><Link to="/" style={styles.navLink}>Home</Link></li>
                    <li><Link to="/services" style={styles.navLink}>Services</Link></li>
                    <li><Link to="/about" style={styles.navLink}>About</Link></li>
                    <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
                    <li><Link to="/login" style={styles.ctaButton}>Get Started</Link></li>
                </ul>

                {/* Hamburger */}
                <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={styles.bar}></span>
                    <span style={styles.bar}></span>
                    <span style={styles.bar}></span>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul style={styles.mobileMenu}>
                    <li><Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/services" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Services</Link></li>
                    <li><Link to="/about" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link to="/contact" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    <li><Link to="/login" style={styles.mobileCta} onClick={() => setMenuOpen(false)}>Get Started</Link></li>
                </ul>
            )}
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#1a1208',
        borderBottom: '1px solid #c9a84c',
        fontFamily: '"Garamond", "Georgia", serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(201, 168, 76, 0.15)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
    },
    logo: {
        color: '#c9a84c',
        fontSize: '1.6rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontStyle: 'italic',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        gap: '2rem',
        margin: 0,
        padding: 0,
        alignItems: 'center',
    },
    navLink: {
        color: '#e8d5a3',
        textDecoration: 'none',
        fontSize: '0.9rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'color 0.3s ease',
        paddingBottom: '2px',
        borderBottom: '1px solid transparent',
    },
    ctaButton: {
        backgroundColor: 'transparent',
        color: '#c9a84c',
        border: '1px solid #c9a84c',
        padding: '0.45rem 1.2rem',
        borderRadius: '2px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
    },
    hamburger: {
        display: 'none',
        flexDirection: 'column',
        gap: '5px',
        cursor: 'pointer',
    },
    bar: {
        width: '25px',
        height: '2px',
        backgroundColor: '#c9a84c',
        display: 'block',
    },
    mobileMenu: {
        listStyle: 'none',
        margin: 0,
        padding: '1rem 2rem',
        backgroundColor: '#1a1208',
        borderTop: '1px solid #c9a84c33',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    mobileLink: {
        color: '#e8d5a3',
        textDecoration: 'none',
        fontSize: '0.95rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    mobileCta: {
        color: '#c9a84c',
        textDecoration: 'none',
        fontSize: '0.95rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
};
//dsadsad
export default NavBar;