import React, { useState, useEffect } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions
import { useNavigate } from 'react-router-dom';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { all } from 'axios';

function ListAllCarsComponent(props) {

    const navigate = useNavigate();

    // For the confirmation/dialog box
    const [show, setShow] = useState(false);

    // Store car to delete, in case user/admin confirms delete
    const [carToDelete, setCarToDelete] = useState("");

    const [isLoading, setisLoading] = useState(false) // Control rendering; optional

    const [allCars, setAllCars] = useState([])

    // Populate the arrays we need to render needed data
    useEffect(() => {

        // Get a list of all cars
        const getListCars = () => {
            setisLoading(true);

            CarService.getAllCars().then((response) => {
                setAllCars(response.data); // Populate initial account array values

            }).catch(error => {
                console.log(error);
            })
            setisLoading(false);
        }

        getListCars();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const deleteCar = () => {

        // // Delete, with selected car body
        CarService.deleteCar(carToDelete).then(res => {
            console.log("Deleted");
        });

        // // Also keep all cars except (the deleted) car with this id
        setAllCars(allCars.filter(c => c.id !== carToDelete.id));

        // Change to not display confirmation box
        setShow(false);
    }

    const viewCarDetails = async (e) => {
        const currentId = await e.target.id;
        navigate(`/car/${currentId}`); // Note: backticks
    }

    const sortTable = async (e) => {
        // Get id from clicked sort span-btn i tablehead
        const currentId = await e.target.id; 

        switch (currentId) {
            case "id": // id's can't be equal - unique
                if (Number(allCars[0].id) > Number(allCars[1].id)) {
                    setAllCars(allCars.sort(function (a, b) { return a.id - b.id }));
                } else {
                    setAllCars(allCars.sort(function (a, b) { return b.id - a.id }));
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
                } else { // Else if unsorted >> sort it
                    setAllCars(allCars.sort((a, b) => a.regNr.localeCompare(b.regNr)));
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
                } else {
                    setAllCars(allCars.sort((a, b) => a.model.localeCompare(b.model)));
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
                } else {
                    setAllCars(allCars.sort(function (a, b) { return a.modelYear - b.modelYear }));
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
                } else {
                    setAllCars(allCars.sort(function (a, b) { return a.dailySek - b.dailySek  }));
                }
                break;
        }


        navigate('/allcars', { replace: true });
    }


    return (
        <div style={{ marginBottom: '5%' }}>

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

            {/* Test for sorting actions */}
            {/* <div className="text-center">
                <Button id='modelYear' variant="primary" onClick={sortTable}>Sort</Button>{" "}
            </div> */}

            <h2 className='list-header'>All Cars</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* Add span-btns for sorting methods */}
                        <th>#<span id='id' variant="primary" onClick={sortTable}> !!!!! </span></th>
                        <th>Reg. Nr<span id='regNr' variant="primary" onClick={sortTable}> !!!!! </span></th>
                        <th>Type</th>
                        <th>Model<span id='model' variant="primary" onClick={sortTable}> !!!!! </span></th>
                        <th>Model Year<span id='modelYear' variant="primary" onClick={sortTable}> !!!!! </span></th>
                        <th>SEK/day<span id='dailySek' variant="primary" onClick={sortTable}> !!!!! </span></th>
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
                {/* <Button variant="primary" onClick={addTrAccount}>New Account</Button>{" "} */}
                {/* <Button variant="warning" onClick={goBack}>Back</Button> */}
            </div>
        </div>
    );
}

export default ListAllCarsComponent;