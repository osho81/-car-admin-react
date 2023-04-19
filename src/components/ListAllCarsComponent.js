import React, { useState, useEffect } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions
import OrderService from '../services/OrderService';
import { useNavigate } from 'react-router-dom';

import LoadingSpinnerComponent from './LoadingSpinnerComponent';

// Keycloak imports (also see npm install of tehse)
import Keycloak from 'keycloak-js';
import { useKeycloak } from '@react-keycloak/web'

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

function ListAllCarsComponent(props) {

    const navigate = useNavigate();

    // Arrow directions for the sorting-icon 
    const [idArrow, setIdArrow] = useState(faSortDown); // Sorting-arrow starts down
    const [regNrArrow, setRegNrArrow] = useState(faSortDown);
    const [modelArrow, setModelArrow] = useState(faSortDown);
    const [modelYearArrow, setModelYearArrow] = useState(faSortDown);
    const [dailySekArrow, setDailySekArrow] = useState(faSortDown);

    // For the confirmation/dialog box
    const [show, setShow] = useState(false);

    // Store car to delete, in case user/admin confirms delete
    const [carToDelete, setCarToDelete] = useState("");

    // Find out if there is substitute car of same type
    const [carsWithSameType, SetCarsWithSameType] = useState([])

    // Find out orders that has booked the car to be deleted
    const [ordersToHandle, setOrdersToHandle] = useState([]);

    const [isLoading, setisLoading] = useState(true) // Control rendering; optional

    const [allCars, setAllCars] = useState([])

    // Set current keycloak after auhtorization
    const { keycloak, initialized } = useKeycloak()

    // Populate the arrays we need to render needed data
    useEffect(() => {

        setisLoading(true);
        // Get a list of all cars
        const getListCars = () => {
            // Include bearer token from keycloak, as arg
            CarService.getAllCars(keycloak.token).then((response) => {
                setAllCars(response.data); // Populate initial account array values
                setisLoading(false);
            }).catch(error => {
                console.log(error);
            })

        }

        // Artificial delay, for loading spinne; estetic reason
        // Artifical delay, for waiting for useKeycloak; logical reason
        setTimeout(getListCars, 750); 
        // getListCars();
        // console.log(keycloak.token);

    }, [props]) // eslint-disable-line react-hooks/exhaustive-deps

    const sortTable = async (e) => {
        // Get id from clicked sort span-btn i tablehead
        const currentId = await e.target.id;

        switch (currentId) {
            case "id": // id's can't be equal - unique
                if (Number(allCars[0].id) > Number(allCars[1].id)) {
                    setAllCars(allCars.sort(function (a, b) { return a.id - b.id }));
                    setIdArrow(faSortDown);
                } else {
                    setAllCars(allCars.sort(function (a, b) { return b.id - a.id }));
                    setIdArrow(faSortUp);
                }
                break;

            case "regNr": // Alphabetical: check if sorted, then sort or reverse
                let sorted1;

                // Check if array is already sorted
                for (let i = 0; i < allCars.length - 1; i++) {
                    if (allCars[i].regNr.localeCompare(allCars[i + 1].regNr) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true; // Needed in JS, otherwise risk undefined
                    }
                }

                if (sorted1) { // if sorted >> reverse array
                    setAllCars(allCars.sort((a, b) => b.regNr.localeCompare(a.regNr)));
                    setRegNrArrow(faSortUp);
                } else { // Else if unsorted >> sort it
                    setAllCars(allCars.sort((a, b) => a.regNr.localeCompare(b.regNr)));
                    setRegNrArrow(faSortDown);
                }
                break;

            case "model": // Same as regNr
                let sorted2;
                for (let i = 0; i < allCars.length - 1; i++) {
                    if (allCars[i].model.localeCompare(allCars[i + 1].model) == 1) {
                        sorted2 = false;
                        break;
                    } else {
                        sorted2 = true;
                    }
                }
                if (sorted2) {
                    setAllCars(allCars.sort((a, b) => b.model.localeCompare(a.model)));
                    setModelArrow(faSortUp);
                } else {
                    setAllCars(allCars.sort((a, b) => a.model.localeCompare(b.model)));
                    setModelArrow(faSortDown);
                }
                break;

            // No sorting by car type, since we can filter by car type

            case "modelYear": // Same as regNr, but numerical in this case
                let sorted3;
                for (let i = 0; i < allCars.length - 1; i++) {
                    if (allCars[i].modelYear > allCars[i + 1].modelYear) {
                        sorted3 = false; // If any is bigger than previous, means unsorted
                        break;
                    } else {
                        sorted3 = true;
                    }
                }

                if (sorted3) {
                    setAllCars(allCars.sort(function (a, b) { return b.modelYear - a.modelYear }));
                    setModelYearArrow(faSortUp);
                } else {
                    setAllCars(allCars.sort(function (a, b) { return a.modelYear - b.modelYear }));
                    setModelYearArrow(faSortDown);
                }
                break;

            case "dailySek": // Same as regNr, but numerical in this case
                let sorted4;
                for (let i = 0; i < allCars.length - 1; i++) {
                    if (allCars[i].dailySek > allCars[i + 1].dailySek) {
                        sorted4 = false; // If any is bigger than previous, means unsorted
                        break;
                    } else {
                        sorted4 = true;
                    }
                }

                if (sorted4) {
                    setAllCars(allCars.sort(function (a, b) { return b.dailySek - a.dailySek }));
                    setDailySekArrow(faSortUp);
                } else {
                    setAllCars(allCars.sort(function (a, b) { return a.dailySek - b.dailySek }));
                    setDailySekArrow(faSortDown);
                }
                break;
        }

        navigate('/allcars', { replace: true });
    }

    const prepareDelete = (car) => {
        setCarToDelete(car); // Set car to delete for later usage in delete function

        setOrdersToHandle([]); // Empty arrays before each delete-preparation
        SetCarsWithSameType([])

        OrderService.getAllOrders(keycloak.token).then((response) => {

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
        allCars.map(c => {
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
        CarService.deleteCar(carToDelete, keycloak.token).then(res => {
            console.log("Deleted");
        });

        // // Also keep all cars except (the deleted) car with this id; so re-renders correct
        setAllCars(allCars.filter(c => c.id !== carToDelete.id));

        // Change to not display confirmation box
        setShow(false);
    }

    const viewCarDetails = async (e) => {
        const currentId = await e.target.id;
        navigate(`/car/${currentId}`); // Note: backticks
    }

    return (
        <div style={{ marginBottom: '5%', fontSize: "12px" }}>

            {/* Div for alert/popup-confirmation box:  */}
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

                {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
            </div>


            <h3 className='list-header'>All Cars</h3>

            {/* Render loading spinner if data is not yet loaded: */}
            {isLoading ? < LoadingSpinnerComponent /> :

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
                        {allCars.map((car) => {
                            return (
                                <tr key={car.id}>
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
                                        </Button>
                                        {" "}

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


                </Table>}

            <br></br>
            <div className="text-center">
                {/* <Button variant="primary" onClick={addTrAccount}>New Account</Button>{" "} */}
                {/* <Button variant="warning" onClick={goBack}>Back</Button> */}
            </div>

        </div>
    );
}

export default ListAllCarsComponent;