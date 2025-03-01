import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";

const ForgetPasswordComponent = () => {
  const [data, setData] = useState([]);
  const [reg_college_email_id, setEmail] = useState('');
  const [reg_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [visitData, setVisitData] = useState([]);
  const [TotalVisita, setTotalVisita] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);
        const totalcount = data.length;
        setTotalVisita(100 + totalcount);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/get_registration')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkEmail = async () => {
    const user = data.find((user) => user.reg_college_email_id === reg_college_email_id);
    if (user) {
      try {
        await axios.post('http://localhost:8000/updateemail', {
          email: user.reg_college_email_id,
          link: `http://localhost:3000/forget?email=${encodeURIComponent(user.reg_college_email_id)}`,
        });
        setEmailExists(true);
        setErrorMessage('');
        setSuccessMessage('Verification email sent. Please check your inbox.');
      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to send verification email.');
      }
    } else {
      setEmailExists(false);
      setErrorMessage('Email not available. Please register.');
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(reg_password)) {
      setErrorMessage('Password must contain at least one uppercase letter, one digit, and one special character.');
      return;
    }

    if (reg_password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/forget`, {
        reg_college_email_id,
        reg_password,
      });

      navigate('/');
      setSuccessMessage('Password updated successfully.');
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailExists(false);
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Container fluid>
        <Row>
          <Col md={7} className="text-center home-section1">
            <div className="fs-1 fw-bold mt-4 text-white" style={{ paddingTop: "10vh" }}>
              WELCOME TO SUMAGO INFOTECH
            </div>

            <div className="text-container">
              <p className="fs-3" style={{ color: "#67c8ff" }}>INDUSTRIAL VISIT MANAGEMENT SYSTEM</p>
            </div>

            <div className="mt-3 text-center mx-5">
              <p className="text-white fs-5 description" style={{ justifyContent: "justify" }}>
                A single platform for managing all stakeholder collaboration which aims to bridge the gap between academia and industry, gain valuable insights and build strong industrial relationships.
              </p>
            </div>

            <div className="text-white" style={{ marginTop: "15vh" }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`<span class="fs-1"><span class="fw-bold">${TotalVisita}</span>+ <span class="fs-5">Completed Visits Until Now</span></span>`)
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(`<span class="fs-1"><span class="fw-bold">${TotalVisita}</span>+ <span class="fs-5">Completed Visits Until Now</span></span>`)
                    .start();
                }}
              />
            </div>
          </Col>

          <Col md={5} className="mx-auto bg-white border border-dark p-3 shadow shadow-md back-color1 " >
            <Form className="d-flex flex-column justify-content-center align-items-center bg-white mx-auto" style={{marginTop:"25vh",width:"30rem"}}>
              <h3 className="text-center text-primary fs-3 mt-2">Forgot Password</h3>

              {!emailExists ? (
                <>
                  <Form.Group className="mt-4">
                    <Form.Control
                      type="email"
                      className="py-2 border border-dark"
                      placeholder="Enter email"
                      value={reg_college_email_id}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <div className="text-center mt-3 mb-3">
                    <Button className="btn btn-primary mt-3" onClick={checkEmail}>
                      Verify Email
                    </Button>
                    <Link to="/" className="text-decoration-none">
                      <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Enter new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={reg_password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="mt-2">Confirm new password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button className="btn btn-primary mt-3" onClick={updatePassword}>
                      Reset Password
                    </Button>
                    <Link to="/" className="text-decoration-none">
                      <Button className="btn btn-danger mt-3 ms-5">Cancel</Button>
                    </Link>
                  </div>
                </>
              )}
            </Form>

            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            {successMessage && <p className="text-success mt-3">{successMessage}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPasswordComponent;
