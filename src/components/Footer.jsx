import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    // Define styles here
    const footerTextStyle = {
        fontSize: '16px'  // Adjust font size as needed
    };

    const linkStyle = {
        fontSize: '16px',  // Adjust link font size as needed
        color: 'white',  // Ensure links are visible
        textDecoration: 'none'  // Optional: remove underline from links
    };

    const iconStyle = {
        fontSize: '24px',  // Adjust icon size as needed
        color: 'white',  // Ensure icons are visible
        padding: '10px'  // Adds spacing around icons for better touch targets
    };

    return (
        <footer className="bg-dark text-white mt-5">
            <Container fluid className="py-4">
                <Row>
                    <Col md={6} className="text-md-left text-center">
                        <p style={footerTextStyle}>&copy; {new Date().getFullYear()} TerkiNews. All rights reserved.</p>
                    </Col>
                    <Col md={3} className="text-md-center text-center">
                        <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
                    </Col>
                    <Col md={3} className="text-md-right text-center">
                        <a href="https://facebook.com" style={iconStyle}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com" style={iconStyle}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" style={iconStyle}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
