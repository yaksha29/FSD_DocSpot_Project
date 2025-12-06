import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {

   const [dateTime, setDateTime] = useState('');
   const [documentFile, setDocumentFile] = useState(null);
   const [show, setShow] = useState(false);

   const currentDate = new Date().toISOString().slice(0, 16);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleChange = (event) => {
      setDateTime(event.target.value);
   };

   const handleDocumentChange = (event) => {
      setDocumentFile(event.target.files[0]);
   };

   const handleBook = async (e) => {
      e.preventDefault()
      try {
         const formattedDateTime = dateTime.replace('T', ' ');
         const formData = new FormData();
         formData.append('image', documentFile);
         formData.append('date', formattedDateTime);
         formData.append('userId', userDoctorId);
         formData.append('doctorId', doctor._id);
         formData.append('userInfo', JSON.stringify(userdata));
         formData.append('doctorInfo', JSON.stringify(doctor));

         const res = await axios.post(
            'http://localhost:8001/api/user/getappointment',
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'multipart/form-data',
               },
            }
         );

         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.success);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Card style={{ width: '18rem' }}>
            <Card.Body>

               <Card.Title>Dr. {doctor.fullName}</Card.Title>

               <Card.Text>
                  <div>Phone: <b>{doctor.phone}</b></div>
               </Card.Text>

               <Card.Text>
                  <div>Address: <b>{doctor.address}</b></div>
               </Card.Text>

               <Card.Text>
                  <div>Specialization: <b>{doctor.specialization}</b></div>
               </Card.Text>

               <Card.Text>
                  <div>Experience: <b>{doctor.experience} Yrs</b></div>
               </Card.Text>

               <Card.Text>
                  <div>Fees: <b>{doctor.fees}</b></div>
               </Card.Text>

               <Card.Text>
                  <div>Timing: <b>{doctor.timings[0]} : {doctor.timings[1]}</b></div>
               </Card.Text>

               <Button variant="primary" onClick={handleShow}>
                  Book Now
               </Button>

               <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Booking appointment</Modal.Title>
                  </Modal.Header>

                  <Form onSubmit={handleBook}>
                     <Modal.Body>
                        <strong><u>Doctor Details:</u></strong>
                        <br />
                        Name: {doctor.fullName}
                        <hr />
                        Specialization: <b>{doctor.specialization}</b>
                        <hr />

                        <Row className="mb-3">
                           <Col md={{ span: 8, offset: 2 }}>
                              <Form.Group controlId="formDateTime" className="mb-3">
                                 <Form.Label>Appointment Date and Time:</Form.Label>
                                 <Form.Control
                                    name="date"
                                    type="datetime-local"
                                    size="sm"
                                    min={currentDate}
                                    value={dateTime}
                                    onChange={handleChange}
                                 />
                              </Form.Group>

                              <Form.Group controlId="formFileSm" className="mb-3">
                                 <Form.Label>Documents</Form.Label>
                                 <Form.Control
                                    accept="image/*"
                                    type="file"
                                    size="sm"
                                    onChange={handleDocumentChange}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                     </Modal.Body>

                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                           Close
                        </Button>
                        <Button type="submit" variant="primary">
                           Book
                        </Button>
                     </Modal.Footer>
                  </Form>
               </Modal>
            </Card.Body>
         </Card>
      </>
   );
};

export default DoctorList;
