import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type NavigationProps = {
    isLoggedIn: boolean,
    logUserOut: () => void
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps){


    return (
        <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>Dog Facts</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                               <Nav.Link as={Link} to='/'>Fun Fact</Nav.Link>
                                <Nav.Link as={Link} to='/' onClick={() => logUserOut()}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
