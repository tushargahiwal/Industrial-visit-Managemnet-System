import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import ColHeader from "./Navbar";
import feedback from "../Images/feedback.jpg";
import Footer from "./Footer";

const Feedback = () => {
  const [feedback_Visit_Date, setVisitDate] = useState("");
  const [feedback_message, setMessage] = useState("");
  const [visitData, setVisitData] = useState([]);
  const [collegeData, setColleData] = useState([]);
  const [datedata, setDateData] = useState([]);

  const college_name = localStorage.getItem("CollegeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        setVisitData(data);

        const filteredCollege = [
          ...new Set(data.map((item) => item.college_name)),
        ];
        setColleData(filteredCollege);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (college_name) {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 30);

      const filteredDate = visitData.filter(
        (item) =>
          item.college_name === college_name &&
          new Date(item.Date_of_visit) <= today &&
          new Date(item.Date_of_visit) >= pastWeek
      );

      setDateData(filteredDate);
    } else {
      setDateData([]);
    }
  }, [college_name, visitData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      college_name,
      feedback_Visit_Date,
      feedback_message,
    };

    axios
      .post("http://localhost:8000/addfeedback", userdata)
      .then((res) => {
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setVisitDate("");
    setMessage("");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  return (
    <>
      <ColHeader />
      <Container fluid className=" mb-5" style={{ paddingTop: "15vh" }}>
        <Row className="align-items-center">
          {/* Image Section */}
          <Col
            md={6}
            sm={12}
            className="mb-4 d-flex justify-content-center align-items-center mt-5"
          >
            <img
              src={feedback}
              alt="Feedback"
              className="rounded-2 w-100 h-auto"
              style={{ maxWidth: "500px" }}
            />
          </Col>
          {/* Form Section */}
          <Col md={6} sm={12} className="d-flex justify-content-center mt-5">
            <Form
              className="p-4 shadow rounded-5 w-100"
              onSubmit={handleSubmit}
              style={{ maxWidth: "400px" }}
            >
              <h2 className="text-center text-primary mb-4">Give Feedback</h2>
              <Form.Group controlId="categoryDropdown" className="mb-4">
                <Form.Label className="text-dark">Visit Date:</Form.Label>
                <Form.Select
                  aria-label="Select Date"
                  value={feedback_Visit_Date}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="py-2"
                >
                  <option value="">
                    -- Select Date --{" "}
                    <FaCaretDown className="ms-2 text-primary" />
                  </option>
                  {datedata.map((item, index) => (
                    <option key={index} value={item.Date_of_visit}>
                      {formatDate(item.Date_of_visit)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-dark">Message:</Form.Label>
                <Form.Control
                  id="feedback"
                  placeholder="Enter message"
                  type="text"
                  value={feedback_message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="py-2"
                />
              </Form.Group>
              <div className="text-center d-flex flex-wrap justify-content-center  ">
                <Button type="submit" className="btn btn-info px-4 mb-2 me-2">
                  Submit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ms-0 ms-md-3 px-4 mb-2"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
       
      </Container>
      <Footer/>
     
    </>
  );
};

export default Feedback;