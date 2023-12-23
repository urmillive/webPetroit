import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthAPI from "../../API/auth";
import AuthContext from "../../Contexts/AuthContext";

function Register() {
  const { setToken } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthAPI.signup(credentials)
      .then((res) => {
        const { data } = res;
        const { token } = data;
        setToken(token);
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        alert("Invalid credentials");
      });
  };

  return (
    <Container>
      <Row>
        <Col sm={4} className="offset-4 mt-5">
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={credentials.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={credentials.password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
