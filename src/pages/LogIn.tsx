import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { timeAndDate } from "./Register";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  login_time: timeAndDate,
};

const LogIn = () => {
  const [user, setUser] = useState(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password, login_time } = user;
    axios
      .post(`${api}/login/`, {
        email,
        password,
        login_time,
      })
      .then(response => {
        if (response.data.success) {
          sessionStorage.setItem("isLoggedIn", "true");
          location.reload();
        } else {
          toast.error(response.data.message, { autoClose: 2500 });
        }
      })
      .catch(error => console.log(error));
    setUser(initialState);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <Container>
        <ToastContainer position="top-left" />
        <Form
          onSubmit={handleSubmit}
          id="responsive-form"
          className="mt-5 w-50 mx-auto bg-white p-5 pb-3 rounded"
        >
          <h2 className="mb-4 f2-1">Login</h2>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={user.email}
              type="email"
              name="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formPassword">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={user.password}
              type="password"
              name="password"
              required
            />
          </Form.Group>
          <Button type="submit">Login</Button>
          <p className="text-end text-secondary mt-2">
            Do not have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default LogIn;
