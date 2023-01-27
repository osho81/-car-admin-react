import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CarService from '../services/CarService'; // Import class with car functions

function ListCarsByTypeComponent(props) {

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
                        setCarsByType(prev => [...prev,  car ]); // Add matching car to filtered list

                    }
                })


            }).catch(error => {
                console.log(error);
            })
            setisLoading(false);
        }
        
        getListCars();

    }, [props]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div style={{ marginBottom: '5%' }}>
            <h2 className='list-header'>Cars</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Reg. Nr</th>
                        <th>Type</th>
                        <th>Model</th>
                        <th>Model Year</th>
                        <th>SEK/day</th>
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