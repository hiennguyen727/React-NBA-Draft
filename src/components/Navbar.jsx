import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '../Navbar.css'
function BasicExample() {
  return (
    <Navbar expand="lg"  id='NARBARBRO' >
      <Container>
        <Navbar.Brand className='navbarwords' href="/">NBA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navlinks">
            <Nav.Link className="navlinks" href="/">Home</Nav.Link>
            <Nav.Link className="navlinks" href="/draftpage">DRAFT PAGE</Nav.Link>
            <Nav.Link className="navlinks" href="/teams">TEAMS</Nav.Link>
            {/* <Nav.Link className="navlinks" href="/aboutme">ABOUT ME</Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      <img className='nbalogo' src='https://wallpapers.com/images/hd/nba-logo-9y2dq91klhsh65jq.jpg'/>
    </Navbar>
  );
}

export default BasicExample;