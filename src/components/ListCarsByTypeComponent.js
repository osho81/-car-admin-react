import React, { useState, useEffect } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions
import OrderService from '../services/OrderService';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import {useKeycloak} from '@react-keycloak/web'

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

    // Find out if there is substitute car of same type
    // same as carsByType, minus the car to delete
    const [carsWithSameType, SetCarsWithSameType] = useState([])

    // Find out orders that has booked the car to be deleted
    const [ordersToHandle, setOrdersToHandle] = useState([]);

    const {keycloak, initialized} = useKeycloak()


    // Populate the arrays we need to render needed data
    useEffect(() => {

        // Get a list of all cars
        const getListCars = () => {
            setisLoading(true);
            setCarsByType([]);// Empty array on each render

            CarService.getAllCars(keycloak.token).then((response) => {

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

    const prepareDelete = (car) => {
        setCarToDelete(car); // Set car to delete for later usage in delete function

        setOrdersToHandle([]); // Empty arrays before each delete-preparation
        SetCarsWithSameType([])

        OrderService.getAllOrders().then((response) => {

            response.data.map((order) => {
                let today = new Date(); // To filter out old orders
                let currentOrderEnd = new Date(order.lastRentalDay);

                // Use car arg instead of carToBeDeleted, otherwise risk state not updated yet
                if (Number(order.carId) == Number(car.id) && currentOrderEnd > today) {
                    setOrdersToHandle(prev => [...prev, order]); // Add matching car to filtered list
                }
            })

            // setOrdersToHandle(respon.data.filter(o => Number(o.carId) == Number(carToDelete.id) ));
        }).catch(error => {
            console.log(error);
        })

        // Get all cars with same type, i.e. substitute cars
        // (Use car arg instead of carToBeDeleted, otherwise risk state not updated yet)
        carsByType.map(c => {
            if (c.type.toString().toUpperCase() == car.type.toString().toUpperCase()
                && Number(c.id) != Number(car.id)) { // Exclude same car
                SetCarsWithSameType(prev => [...prev, c]);
            }
        });

        setShow(true); // Show warning alert, to confirm or cancel delete
        // deleteCar(car);
    }

    const deleteCar = async () => {
        console.log(ordersToHandle.length);
        console.log(carsWithSameType.length);

        // Handle orders that includes same car id, before delete
        if (ordersToHandle.length > 0 && carsWithSameType.length > 0) { // If substitute car is available
            for (var i = 0; i < ordersToHandle.length; i++) {
                console.log(ordersToHandle[i]);

                // Create order to send as request body for update order put method
                const id = ordersToHandle[i].id;
                const orderNr = ordersToHandle[i].orderNr;
                const canceled = ordersToHandle[i].canceled;
                const firstRentalDay = ordersToHandle[i].firstRentalDay;
                const lastRentalDay = ordersToHandle[i].lastRentalDay;
                const numberOfDays = ordersToHandle[i].numberOfDays;
                const customerId = ordersToHandle[i].customerId;
                const carId = carsWithSameType[0].id; // New value, from first substitute cars list
                const price = ordersToHandle[i].price;
                const priceInEuro = ordersToHandle[i].priceInEuro;

                // Created updated-object to pass as request bnody, where only substitute carId is updated
                let newOrderDetails = { id, orderNr, canceled, firstRentalDay, lastRentalDay, numberOfDays, customerId, carId, price, priceInEuro };
                // let newOrderDetails = { id, orderNr, carId}; // This would actually be enough for this case

                // Update order, and give any of the substitute cars
                await OrderService.updateOrder(newOrderDetails).then((response) => {
                    console.log("Updated and handled pertinent orders");
                }).catch(error => {
                    console.log(error)
                });
            }

            // If no substitute car, cancel orders with deleted car, since no substitutes
        } else if (ordersToHandle.length > 0 && carsWithSameType.length <= 0) { // If no substitute car
            for (var i = 0; i < ordersToHandle.length; i++) {
                console.log(ordersToHandle[i]);
                console.log("Nooo substitute");

                // Create order to send as request body for update order put method
                const id = ordersToHandle[i].id;
                const orderNr = ordersToHandle[i].orderNr;
                const canceled = true; // Cancel order, since no substitute car of same type!
                const firstRentalDay = ordersToHandle[i].firstRentalDay;
                const lastRentalDay = ordersToHandle[i].lastRentalDay;
                const customerId = ordersToHandle[i].customerId;
                const carId = ordersToHandle[i].carId; // Keep same car id, since no substitute car of same type
                const price = ordersToHandle[i].price;
                const numberOfDays = ordersToHandle[i].numberOfDays;
                const priceInEuro = ordersToHandle[i].priceInEuro;

                // Created updated-object to pass as request body, where only substitute carId is updated
                let newOrderDetails = { id, orderNr, canceled }; // Use only needed fields
                // Note: backend will get original car id, if carId is missing (i.e. "null" or 0) but since it is deleted, it will set carId to zero
                // An alternative is to send (almost) all field, at least including carId in request body:
                // let newOrderDetails = { id, orderNr, canceled, firstRentalDay, lastRentalDay, numberOfDays, customerId, carId, price, priceInEuro };

                // Update order, and give any of the substitute cars
                await OrderService.updateOrder(newOrderDetails).then((response) => {
                    console.log("Canceled pertinent orders");
                }).catch(error => {
                    console.log(error)
                });
            }

        } else {
            console.log("Nothing to handle");
        }

        // // Delete, with selected car body
        CarService.deleteCar(carToDelete).then(res => {
            console.log("Deleted");
        });

        // // Also keep all cars except (the deleted) car with this id; so re-renders correct
        setCarsByType(carsByType.filter(c => c.id !== carToDelete.id));

        // Change to not display confirmation box
        setShow(false);
    }

    const viewCarDetails = async (e) => {
        const currentId = await e.target.id;
        navigate(`/car/${currentId}`); // Note: backticks
    }

    return (
        <div style={{ marginBottom: '5%', fontSize: "12px" }}>

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

            <h3 className='list-header'>Cars</h3>
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
                            Model Year <span className="not-clickable-part">
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
                                <td className='btns-td'>

                                    <Button className="neutral-btn info-btn" id={car.id} variant="primary" onClick={viewCarDetails}>
                                        <span className="not-clickable-part"><FontAwesomeIcon icon={faInfo} />
                                        </span>
                                    </Button>{" "}

                                    {/* // Prepare deletion of car: */}
                                    <Button className="delete-btn" variant="danger" onClick={() => {
                                        // setCarToDelete(car);
                                        prepareDelete(car);
                                    }}>Delete</Button>



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