import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";

import AuthContext from "../Contexts/AuthContext";

function AppNavbar() {
  const { user, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Practical
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Students
              </NavLink>
            </Nav>
          )}
          {!user && (
            <Nav className="ms-auto">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </Nav>
          )}
          {user && (
            <Nav className="ms-auto">
              <NavDropdown
                title={`Welcome, ${user.name}`}
                id="basic-nav-dropdown"
                className="dropdown-menu-end"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
