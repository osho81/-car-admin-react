import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CarService from '../services/CarService';
import { useKeycloak } from '@react-keycloak/web';

// Collect inputs from user, and send post request to create car

function UpdateCarComponent(props) {

    const navigate = useNavigate()

    const {keycloak, initialized} = useKeycloak()

    const { id } = useParams() // get id param from current url

    // Car before update, to display current field values
    const [car, setCar] = useState('')

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

    useEffect(() => { // Initial retrieval of customer details/values

        async function getCar() {
            // Note: car-customer-react project uses getById instead of this approach
            CarService.getAllCars(keycloak.token).then((response) => {
                response.data.map((c) => {
                    if (c.id === Number(id)) { // Find specific car
                        setCar(c);

                        // Also set initial value, if e.g. user leaves some fields empty
                        setRegNr(c.regNr);
                        setModel(c.model);
                        setType(c.type);
                        setModelYear(c.modelYear);
                        setDailySek(c.dailySek);
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }
        getCar();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    // Update  car with field inputs, send as request body in a post request
    const createCar = (e) => { // create = update, i.e. "re-create"
        e.preventDefault();

        // Update object with field inputs, to send as request body
        let carToUpdate = { id, regNr, model, type, modelYear, dailySek };

        // Send post request wih created object as body
        CarService.updateCar(carToUpdate, keycloak.token).then((response) => {
            navigate(`/car/${car.id}`); // Display updated car on success
        }).catch(error => {
            console.log(error)
        });;
    }

    // Go back to list for all cars, when canceled
    // const goToCarsList = () => {
    //     navigate('/allcars', { replace: true });
    // }

    const goBackToCarView = async (e) => {
        const currentId = await e.target.id;
        navigate(`/car/${currentId}`); // Note: backticks
    }


    return (
        <div>
            <Container style={{ marginTop: '3%', marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>
                {/* Card has 75% width of the container's 75% screen width */}
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 24 }} > Car details</Card.Title>
                        <Card.Text>
                            Please enter new car details and press submit to update
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 14, fontWeight: 500 }}>
                            <Form.Group className="mb-2" controlId="formBasicRegNr">
                                <Form.Label>Registration Number</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={car.regNr}
                                    value={regNr} onChange={handleRegNr} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicModel">
                                <Form.Label>Model/Brand</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={car.model}
                                    value={model} onChange={handleModel} />
                            </Form.Group>
                            {/* Select - options for car type (enum at backend)*/}
                            <Form.Group className="mb-2" controlId="formBasicType">
                                <Form.Label>Type</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    value={type} onChange={handleType}>
                                    <option>Current type: {car.type}</option>
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
                                <Form.Control size="sm" type="number" placeholder={car.modelYear}
                                    min="1980" max="2099" step="1"
                                    value={modelYear} onChange={handleModelYear} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicDailySek">
                                <Form.Label>SEK per day</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={car.dailySek}
                                    min="0" max="2000" step="10"
                                    value={dailySek} onChange={handleDailySek} />
                            </Form.Group>

                            <div className="separate-btns-row">
                                <Button id={car.id} variant="warning" onClick={goBackToCarView}>Cancel</Button>{' '}
                                <Button variant="primary" onClick={createCar}>Submit</Button>
                            </div>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default UpdateCarComponent;