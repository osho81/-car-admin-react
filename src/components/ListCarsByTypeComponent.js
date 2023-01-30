import React, { useState, useEffect } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

// For more comments see ListALlCarsComponent

function ListCarsByTypeComponent(props) {

    const navigate = useNavigate();

    const [idArrow, setIdArrow] = useState(faSortDown);
    const [regNrArrow, setRegNrArrow] = useState(faSortDown);
    const [modelArrow, setModelArrow] = useState(faSortDown);
    const [modelYearArrow, setModelYearArrow] = useState(faSortDown);
    const [dailySekArrow, setDailySekArrow] = useState(faSortDown);

    const [show, setShow] = useState(false);

    const [carToDelete, setCarToDelete] = useState("");

    const [isLoading, setisLoading] = useState(false)

    const [carsByType, setCarsByType] = useState([])

    // Populate the arrays we need to render needed data
    useEffect(() => {
        // Get a list of all cars
        const getListCars = () => {
            setisLoading(true);
            setCarsByType([]);// Empty array on each render

            CarService.getAllCars().then((response) => {

                response.data.map((car) => {
                    if (car.type === props.type.toString().toUpperCase()) {
                        setCarsByType(prev => [...prev, car]); // Add matching car to filtered list

                    }
                })


            }).catch(error => {
                console.log(error);
            })
            setisLoading(false);
        }

        getListCars();

    }, [props]) // eslint-disable-line react-hooks/exhaustive-deps

    const deleteCar = () => {

        CarService.deleteCar(carToDelete).then(res => {
            console.log("Deleted");
        });

        setCarsByType(carsByType.filter(c => c.id !== carToDelete.id));

        setShow(false);
    }

    const viewCarDetails = async (e) => {
        const currentId = await e.target.id;
        navigate(`/car/${currentId}`); // Note: backticks
    }

    const sortTable = async (e) => {
        const currentId = await e.target.id;

        switch (currentId) {
            case "id":
                if (Number(carsByType[0].id) > Number(carsByType[1].id)) {
                    setCarsByType(carsByType.sort(function (a, b) { return a.id - b.id }));
                    setIdArrow(faSortDown);
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return b.id - a.id }));
                    setIdArrow(faSortUp);
                }
                break;

            case "regNr":
                let sorted1;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].regNr.localeCompare(carsByType[i + 1].regNr) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true;
                    }
                }

                if (sorted1) {
                    setCarsByType(carsByType.sort((a, b) => b.regNr.localeCompare(a.regNr)));
                    setRegNrArrow(faSortUp);
                } else {
                    setCarsByType(carsByType.sort((a, b) => a.regNr.localeCompare(b.regNr)));
                    setRegNrArrow(faSortDown);
                }
                break;

            case "model":
                let sorted2;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].model.localeCompare(carsByType[i + 1].model) == 1) {
                        sorted2 = false;
                        break;
                    } else {
                        sorted2 = true;
                    }
                }
                if (sorted2) {
                    setCarsByType(carsByType.sort((a, b) => b.model.localeCompare(a.model)));
                    setModelArrow(faSortUp);
                } else {
                    setCarsByType(carsByType.sort((a, b) => a.model.localeCompare(b.model)));
                    setModelArrow(faSortDown);
                }
                break;

            // No sorting by car type, since we can filter by car type

            case "modelYear":
                let sorted3;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].modelYear > carsByType[i + 1].modelYear) {
                        sorted3 = false;
                        break;
                    } else {
                        sorted3 = true;
                    }
                }

                if (sorted3) {
                    setCarsByType(carsByType.sort(function (a, b) { return b.modelYear - a.modelYear }));
                    setModelYearArrow(faSortUp);
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return a.modelYear - b.modelYear }));
                    setModelYearArrow(faSortDown);
                }
                break;

            case "dailySek":
                let sorted4;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].dailySek > carsByType[i + 1].dailySek) {
                        sorted4 = false;
                        break;
                    } else {
                        sorted4 = true;
                    }
                }

                if (sorted4) {
                    setCarsByType(carsByType.sort(function (a, b) { return b.dailySek - a.dailySek }));
                    setDailySekArrow(faSortUp);
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return a.dailySek - b.dailySek }));
                    setDailySekArrow(faSortDown);
                }
                break;
        }

        // Redirect to current filtered car type view, e.g. "/minicars"
        navigate(`/${props.type.toString().toLowerCase()}cars`);
    }



    return (
        <div style={{ marginBottom: '5%' }}>

            <div style={{ position: "fixed", marginLeft: "25%" }}>
                <Alert show={show} variant="danger">
                    <Alert.Heading>WARNING!</Alert.Heading>
                    <p>You are about to delete the car; please confirm or cancel:</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <Button className="neutral-btn" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button className="delete-btn" variant="danger" onClick={() => deleteCar()}>
                            Confirm
                        </Button>
                    </div>
                </Alert>
            </div>

            <h2 className='list-header'>Cars</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* Add span-btns for sorting methods */}
                        <th><span id='id' variant="primary" onClick={sortTable}>
                            # <span className="not-clickable-part">
                                <FontAwesomeIcon icon={idArrow} />
                            </span></span></th>
                        <th><span id='regNr' variant="primary" onClick={sortTable}>
                            Reg. Nr <span className="not-clickable-part">
                                <FontAwesomeIcon icon={regNrArrow} />
                            </span></span></th>
                        <th>Type</th>
                        <th><span id='model' variant="primary" onClick={sortTable}>
                            Model <span className="not-clickable-part">
                                <FontAwesomeIcon icon={modelArrow} />
                            </span></span></th>
                        <th><span id='modelYear' variant="primary" onClick={sortTable}>
                            Model Year<span className="not-clickable-part">
                                <FontAwesomeIcon icon={modelYearArrow} />
                            </span></span></th>
                        <th><span id='dailySek' variant="primary" onClick={sortTable}>
                            SEK/day <span className="not-clickable-part">
                                <FontAwesomeIcon icon={dailySekArrow} />
                            </span></span></th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody style={{ fontWeight: 500 }}>
                    {carsByType.map((car, index) => {
                        return (
                            <tr key={index}>
                                <td> {car.id} </td>
                                <td> {car.regNr} </td>
                                <td> {car.type}</td>
                                <td> {car.model}</td>
                                <td> {car.modelYear}</td>
                                <td> {car.dailySek}</td>
                                <td>

                                    <Button className="neutral-btn info-btn" id={car.id} variant="primary" onClick={viewCarDetails}>
                                        <span className="not-clickable-part"><FontAwesomeIcon icon={faInfo} />
                                        </span>
                                    </Button>
                                    {" "}

                                    {/* <Button className="delete-btn" variant="danger" onClick={() => deleteCar(car)}>Delete</Button> */}
                                    {/* (Alternatively assign car.id as id for this row, find car and send to delete request) */}

                                    <Button className="delete-btn" variant="danger" onClick={() => { setShow(true); setCarToDelete(car); }}>Delete</Button>

                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
            <br></br>
            <div className="text-center">
                {/* <Button variant="primary" onClick={addTrAccount}>New Account</Button>{" "}
                <Button variant="warning" onClick={goBack}>Back</Button> */}
            </div>
        </div>
    );
}

export default ListCarsByTypeComponent;