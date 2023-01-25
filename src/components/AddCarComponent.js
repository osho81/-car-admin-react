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
                            Please enter car details and press submit when done
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 14, fontWeight: 500 }}>
                            <Form.Group className="mb-2" controlId="formBasicRegNr">
                                <Form.Label>Registration Number</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter reg.nr "
                                    value={regNr} onChange={handleRegNr} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicModel">
                                <Form.Label>Model/Brand</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter model"
                                    value={model} onChange={handleModel} />
                            </Form.Group>
                            {/* Select - options for car type (enum at backend)*/}
                            <Form.Group className="mb-2" controlId="formBasicType">
                                <Form.Label>Type</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    value={type} onChange={handleType}>
                                    <option>Select car Type</option>
                                    <option value="MINI">Mini</option>
                                    <option value="SEDAN">Sedan</option>
                                    <option value="SPORT">Sport</option>
                                    <option value="CAB">Cab</option>
                                    <option value="SUV">Suv</option>
                                    <option value="BUS">Bus</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicModelYear">
                                <Form.Label>Model Year</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter model year"
                                    value={modelYear} onChange={handleModelYear} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicDailySek">
                                <Form.Label>SEK per day</Form.Label>
                                <Form.Control size="sm" type="number" placeholder="Enter Enter SEK/day"
                                    value={dailySek} onChange={handleDailySek} />
                            </Form.Group>

                            {/* <Button variant="primary" onClick={createCustomer}>Submit</Button>{' '}
                            <Button variant="warning" onClick={goToListCustomers}>Cancel</Button> */}

                            {/* <Button type="submit">Submit form</Button> */}

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default AddCarComponent;