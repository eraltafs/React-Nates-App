import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';


function NavbarCom() {
    const location = useLocation()
    

    return (
        <Navbar expand="lg" className="body-tertiary bg-dark">
            <Container >
                <Navbar.Brand style={{ color: "white" }} as={Link} to="/">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link
                            className={`text-decoration-none mx-2 ${location.pathname === "/" ? "text-danger" : ""}`}
                            to="/">
                            Home
                        </Link>
                    </Nav>
                    {localStorage.getItem("token") ?
                        <div className="ml-auto">
                            <Link
                                className='text-decoration-none mx-2'
                                onClick={() => localStorage.removeItem("token")}
                                to="/login">
                                Logout
                            </Link>
                        </div>
                        :
                        <div className="ml-auto">
                            <Link
                                className={`text-decoration-none mx-2 ${location.pathname === "/signup" ? "text-danger" : ""}`}
                                to="/signup">
                                Signup
                            </Link>
                            <Link
                                className={`text-decoration-none mx-2 ${location.pathname === "/login" ? "text-danger" : ""}`}
                                to="/login">
                                Login
                            </Link>
                        </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarCom