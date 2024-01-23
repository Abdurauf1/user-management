import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { InitialState } from "../types";
import axios from "axios";

// global time and date function
const now = new Date();
const time = now.toLocaleTimeString();
const date = now.toLocaleDateString("en-EN", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});

export const timeAndDate = date + " " + time;

const initialState: InitialState = {
  name: "",
  email: "",
  password: "",
  reg_time: timeAndDate,
  login_time: "Is not logged in yet",
  activityStatus: "active",
};

const Register = () => {
  const [state, setState] = useState<InitialState>(initialState);

  const { name, email, password, reg_time, login_time, activityStatus } = state;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`${api}/register/`, {
        name,
        email,
        password,
        reg_time,
        login_time,
        activityStatus,
      })
      .then(response => {
        if (!response.data.success) {
          toast.error(response.data.message, { autoClose: 2000 });
        } else {
          toast.success(response.data.message, {
            autoClose: 1000,
          });
          setTimeout(() => {
            location.href = "/";
          }, 1500);
        }
      })
      .catch(error => console.log(error));
    setState(initialState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Container>
      <ToastContainer position="top-left" />
      <Form
        id="responsive-form"
        method="POST"
        onSubmit={handleSubmit}
        className="mt-5 w-50 mx-auto bg-white p-5 pb-3 rounded"
      >
        <h2 className="mb-4 fs-2">Registration</h2>
        <Form.Group className="mb-4" controlId="formName">
          <Form.Label>
            Full Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Label>
            Email <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={email}
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
            value={password}
            type="password"
            name="password"
            required
          />
        </Form.Group>
        <Button type="submit">Register</Button>
        <p className="text-end text-secondary mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none">
            Login
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
