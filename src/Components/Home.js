import React, { useState } from "react";
import image1 from "./imag1.png";
import image2 from "./image2.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Navbar1 from "./Navbar copy";
import image3 from "./product1.png";
import image4 from "./product2.jpg";
import image5 from "./product3.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import image6 from "./product5.png";
import "../App.css";
import { IoHome } from "react-icons/io5";
import contact from "./contact.png";
import { Form } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [fname, setFname] = useState("");
  const [product, setproduct] = useState("");
  const [adress, setadress] = useState("");
  const [mobile, setmobile] = useState("");

  const handleSubmit = () => {
    const userdata = {
      fname,
      product,
      adress,
      mobile,
    };

    axios
      .post("http://localhost:8000/register", userdata)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        // Handle error (e.g., show an error message)
      });
  };
  return (
    <div>
      <Navbar1 />

      <Container fluid>
        <Row>
          <Col md={5}>
            <img src={image1} style={{ width: "884px", height: "602px" }}></img>
          </Col>
          <Col md={7} style={{ backgroundColor: "#1B325F" }}>
            <div className="ms-5" style={{ paddingTop: "10rem" }}>
              <h2 className="text-white" style={{ fontSize: "80px" }}>
                Lorem Ipsum
              </h2>
              <p className="text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and
              </p>
              <Button className="btn btn-danger px-2">
                {" "}
                Explore Our Solution{" "}
                <FaLongArrowAltRight size={30} className="ms-1" />
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 ms-5">
          <h2 className="text-danger fw-bold">About US</h2>
          <p className="text-primary fs-4 fw-bold">
            Lorem Ipsum is simply dummy
          </p>
          <Col md={6}>
            <img src={image2} style={{ width: "710px", height: "400px" }}></img>
          </Col>
          <Col md={6}>
            <p>
              <b>Lorem Ipsum</b> is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.s simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type{" "}
            </p>
            <ul className="text-decoration-none">
              <li className="text-danger fs-5">
                <b className="text-dark">Lorem Ipsum</b>
              </li>
              <li className="text-danger fs-5">
                <b className="text-dark">Lorem Ipsum</b>
              </li>
              <li className="text-danger fs-5">
                <b className="text-dark">Lorem Ipsum</b>
              </li>
              <li className="text-danger fs-5">
                <b className="text-dark">Lorem Ipsum</b>
              </li>
            </ul>
            <Button className="btn btn-danger px-2 ms-3">
              {" "}
              Learn More <FaLongArrowAltRight size={30} className="ms-1" />
            </Button>
          </Col>
        </Row>
      </Container>

      <Row className="ms-5 mt-4 mb-4">
        <h2 className="text-danger fw-bold">Product</h2>
        <Col md={4}>
          <img src={image3} style={{ width: "470px", height: "300px" }}></img>
          <p
            className="text-center text-white fs-5 p-2"
            style={{ backgroundColor: "#1B325F" }}
          >
            Sales
          </p>
        </Col>
        <Col md={4}>
          <img src={image4} style={{ width: "470px", height: "300px" }}></img>
          <p
            className="text-center text-white fs-5 p-2"
            style={{ backgroundColor: "#1B325F" }}
          >
            Sales
          </p>
        </Col>
        <Col md={4}>
          <img src={image5} style={{ width: "470px", height: "300px" }}></img>
          <p
            className="text-center text-white fs-5 p-2"
            style={{ backgroundColor: "#1B325F" }}
          >
            Sales
          </p>
        </Col>
      </Row>

      <Col
        md={12}
        className="background-section11 mt-4 d-flex flex-column justify-content-center  align-items-center text-white"
      >
        <h2 className="fw-bold">Have Any Project With US</h2>
        <p className="mx-auto">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an
        </p>
        <p>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an
        </p>
        <Button className="btn btn-danger px-2">Enquiry Now</Button>
      </Col>

      <Row className="">
        <h2 className="text-danger fw-bold mt-4 ms-3 ">Our Services</h2>
        <Col
          md={12}
          className="background-section12 mt-2 d-flex flex-column justify-content-center mx-auto align-items-center text-white "
        >
          <Row>
            <Col md={2} className="me-5">
              <IoHome
                className="text-white fw-bold rounded-circle px-3 py-3 bg-danger"
                size={80}
              />
            </Col>
            <Col md={2} className="me-5">
              <IoHome
                className="text-white fw-bold rounded-circle px-3 py-3 bg-danger"
                size={80}
              />
            </Col>
            <Col md={2} className="me-5">
              <IoHome
                className="text-white fw-bold rounded-circle px-3 py-3 bg-danger"
                size={80}
              />
            </Col>
            <Col md={2} className="me-5">
              <IoHome
                className="text-white fw-bold rounded-circle px-3 py-3 bg-danger"
                size={80}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        style={{ backgroundColor: "#FFF2F2", height: "15rem" }}
        className="mt-4"
      >
        <h2
          className="text-danger fw-bold mt-4 ms-3 "
          style={{ paddingLeft: "70px" }}
        >
          Our Services
        </h2>
      </Row>

      <Row className="mt-5 ms-4">
        <Col md={6}>
          <img src={contact} style={{ width: "850px", height: "450px" }} />
        </Col>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
          <div
            style={{
              border: "1px solid #007bff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "10px",
              height: "24rem",
              width: "25rem",
              margin: "auto",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#007bff",
                fontSize: "1.5rem",
                marginBottom: "20px",
              }}
              className="text-danger fw-bold"
            >
              Contact Us
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={adress}
                  onChange={(e) => setadress(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  id="product"
                  name="product"
                  placeholder="Enter Product"
                  value={product}
                  onChange={(e) => setproduct(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  width: "30%",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "120px",
                }}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Home;
