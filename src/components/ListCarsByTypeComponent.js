import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions
import { useNavigate } from 'react-router-dom';

function ListCarsByTypeComponent(props) {

    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false) // Control rendering; optional

    const [carsByType, setCarsByType] = useState([])

    // Populate the arrays we need to render needed data
    useEffect(() => {
        // Get a list of all cars
        const getListCars = () => {
            setisLoading(true);
            setCarsByType([]);

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


    const sortTable = async (e) => {
        // Get id from clicked sort span-btn i tablehead
        const currentId = await e.target.id;

        switch (currentId) {
            case "id": // id's can't be equal - unique
                if (Number(carsByType[0].id) > Number(carsByType[1].id)) {
                    setCarsByType(carsByType.sort(function (a, b) { return a.id - b.id }));
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return b.id - a.id }));
                }
                break;

            case "regNr": // Alphabetical: check if sorted, then sort or reverse
                let sorted1;

                // Check if array is already sorted
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].regNr.localeCompare(carsByType[i + 1].regNr) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true; // Needed in JS, otherwise risk undefined
                    }
                }

                if (sorted1) { // if sorted >> reverse array
                    setCarsByType(carsByType.sort((a, b) => b.regNr.localeCompare(a.regNr)));
                } else { // Else if unsorted >> sort it
                    setCarsByType(carsByType.sort((a, b) => a.regNr.localeCompare(b.regNr)));
                }
                break;

            case "model": // Same as regNr
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
                } else {
                    setCarsByType(carsByType.sort((a, b) => a.model.localeCompare(b.model)));
                }
                break;

            // No sorting by car type, since we can filter by car type

            case "modelYear": // Same as regNr, but numerical in this case
                let sorted3;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].modelYear > carsByType[i + 1].modelYear) {
                        sorted3 = false; // If any is bigger than previous, means unsorted
                        break;
                    } else {
                        sorted3 = true;
                    }
                }

                if (sorted3) {
                    setCarsByType(carsByType.sort(function (a, b) { return b.modelYear - a.modelYear }));
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return a.modelYear - b.modelYear }));
                }
                break;

            case "dailySek": // Same as regNr, but numerical in this case
                let sorted4;
                for (let i = 0; i < carsByType.length - 1; i++) {
                    if (carsByType[i].dailySek > carsByType[i + 1].dailySek) {
                        sorted4 = false; // If any is bigger than previous, means unsorted
                        break;
                    } else {
                        sorted4 = true;
                    }
                }

                if (sorted4) {
                    setCarsByType(carsByType.sort(function (a, b) { return b.dailySek - a.dailySek }));
                } else {
                    setCarsByType(carsByType.sort(function (a, b) { return a.dailySek - b.dailySek }));
                }
                break;
        }

        // Redirect to current filtered car type view, e.g. "/minicars"
        navigate(`/${props.type.toString().toLowerCase()}cars`); 
    }



    return (
        <div style={{ marginBottom: '5%' }}>
            <h2 className='list-header'>Cars</h2>
            <Table striped bordered hover>
                <thead>
                    {/* <tr>
                        <th>#</th>
                        <th>Reg. Nr</th>
                        <th>Type</th>
                        <th>Model</th>
                        <th>Model Year</th>
                        <th>SEK/day</th>
                    </tr> */}
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

                                    {/* <Button variant="primary" onClick={() => viewTrAccountDetails(trAccount.id)}>Select</Button>{" "}
                                <Button variant="danger" onClick={() => deleteTrAccount(trAccount.id)}>Delete</Button> */}

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