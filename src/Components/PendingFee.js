import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import ColHeader from "./Navbar";
import { useNavigate } from "react-router-dom";
import pendingfee from "../Images/pendingFees.jpg";
import Footer from "./Footer";

const PendingFee = () => {
  const [visitData, setVisitData] = useState([]);
  const [datedata, setDateData] = useState([]);
  const [selectedFee, setSelectedFee] = useState("");
  const collegename = localStorage.getItem("CollegeName");
  const [fees_status, setFeesStatus] = useState("");
  const [id, setId] = useState("");
  const [transaction_id, setTransactionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.fees !== 0 &&
            visit.fees_status === "unpaid"
        );
        setVisitData(filteredData);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const datevisitdata = filteredData
          .filter((item) => {
            const visitDate = new Date(item.Date_of_visit);
            visitDate.setHours(0, 0, 0, 0);
            return visitDate >= today;
          })
          .map((item) => ({
            date: item.Date_of_visit,
            fees: item.fees,
            id: item._id,
          }));

        setDateData(datevisitdata);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.toLocaleString("default", {
      month: "short",
    })}-${d.getFullYear()}`;
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const selectedItem = datedata.find((item) => item.date === selectedDate);
    if (selectedItem) {
      setSelectedFee(selectedItem.fees);
      setId(selectedItem.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = { fees_status, transaction_id };

    axios
      .put(`http://localhost:8000/updatevisit/${id}`
      , userdata)
      .then(() => {
        alert("Fee status updated successfully!");
        navigate("/pendingvisit");
        setId("");
        setFeesStatus("");
        setTransactionId("");
        setSelectedFee("");
      })
      .catch((err) => {
        console.error("Error updating fee status:", err);
        alert("Error updating fee status. Please try again.");
      });
  };

  return (
    <>
    <Container fluid className="mb-5" style={{ paddingTop: "15vh" }}>
      <Row className="align-items-center">
        <ColHeader />
        {/* Image Section */}
        <Col
          md={6}
          sm={12}
          className="mb-4 d-flex justify-content-center align-items-center"
        >
          <img
            src={pendingfee}
            alt="Pending Fees"
            className="rounded-2 img-fluid"
            style={{ maxHeight: "600px", maxWidth: "100%" }}
          />
        </Col>
        {/* Form Section */}
        <Col md={6} sm={12} className="d-flex justify-content-center">
          <Form
            className="p-4 shadow rounded-5 w-100"
            style={{ maxWidth: "500px" }}
            onSubmit={handleSubmit}
          >
            <h3 className="text-center text-primary mb-4">Pay Fees</h3>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">College Name:</Form.Label>
              <Form.Control
                placeholder="Enter name"
                type="text"
                value={collegename}
                readOnly
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Date of Visit:</Form.Label>
              <Form.Select
                aria-label="Select Date"
                onChange={handleDateChange}
                className="py-2"
              >
                <option value="">Select Date</option>
                {datedata.map((dateItem, idx) => (
                  <option key={idx} value={dateItem.date}>
                    {formatDate(dateItem.date)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Fees:</Form.Label>
              <Form.Control type="text" value={selectedFee} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Transaction Id:</Form.Label>
              <Form.Control
                placeholder="Enter transaction id"
                type="text"
                value={transaction_id}
                onChange={(e) => setTransactionId(e.target.value)}
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fees Paid Status:</Form.Label>
              <Form.Select
                value={fees_status}
                onChange={(e) => setFeesStatus(e.target.value)}
                className="py-2"
              >
                <option value="">Select here...</option>
                <option value="paid">Paid</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button variant="info" type="submit" className="mt-3 px-4">
                Submit
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

export default PendingFee;