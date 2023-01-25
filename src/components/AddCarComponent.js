import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

// Collect inputs from user, and send post request to create car

function AddCarComponent(props) {


    // Car fields, to send to backend post request api
    const [regNr, setRegNr] = useState("")
    const [model, setModel] = useState("")
    const [type, setType] = useState("")
    const [modelYear, setModelYear] = useState("")
    const [dailySek, setDailySek] = useState("")

    // Functions for handling inputs, i.e. update car fields with useStates
    const handleRegNr = (e) => { setRegNr(e.target.value); } 
    const handleModel = (e) => { setModel(e.target.value); } 
    const handleType = (e) => { setType(e.target.value); } 
    const handleModelYear = (e) => { setModelYear(e.target.value); } 
    const handleDailySek = (e) => { setDailySek(e.target.value); } 


    return (
        <div>
            <Container style={{ marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>
                {/* Card has 75% width of the container's 75% screen width */}
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 24 }} > Customer details</Card.Title>
                        <Card.Text>
                            Please enter customer details and press submit when done
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 14, fontWeight: 500 }}>
                            <Form.Group className="mb-2" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter first name"
                                    value={fName} onChange={handleFName} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter last name"
                                    value={lName} onChange={handleLName} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Enter date of birth"
                                    value={dateOfBirth} onChange={handleDateOfBirth} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicSsn">
                                <Form.Label>SSN </Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter social security number"
                                    value={ssn} onChange={handleSsn} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter address"
                                    value={address} onChange={handleAddress} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control size="sm" type="email" placeholder="Enter email"
                                    value={email} onChange={handleEmail} />
                            </Form.Group>

                            <Button variant="primary" onClick={createCustomer}>Submit</Button>{' '}
                            <Button variant="warning" onClick={goToListCustomers}>Cancel</Button>

                            {/* <Button type="submit">Submit form</Button> */}

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default AddCarComponent;