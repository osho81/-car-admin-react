import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

// For other comments see ListAllCarsComponent

function ListAllCarsComponent(props) {


    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false)

    const [allCustomers, setAllCustomers] = useState([])

    useEffect(() => {
        const getAllCustomers = () => {
            setisLoading(true);

            CustomerService.getAllCustomers().then((response) => {
                setAllCustomers(response.data);

            }).catch(error => {
                console.log(error);
            })
            setisLoading(false);
        }

        getAllCustomers();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const viewCustomerOrders = async (e) => {
        const currentId = await e.target.id;
        navigate(`/customer/${currentId}`); // Note: backticks
    }

    return (
        <div style={{ marginBottom: '5%' }}>
            <h2 className='list-header'>All Customers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SSN</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Orders</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody style={{ fontWeight: 500 }}>
                    {allCustomers.map((customer, index) => {
                        return (
                            <tr key={index}>
                                <td> {customer.id} </td>
                                <td> {customer.ssn} </td>
                                <td> {customer.dateOfBirth} </td>
                                <td> {customer.email} </td>
                                <td> {customer.fName} </td>
                                <td> {customer.lName} </td>
                                <td> {customer.address} </td>

                                <td>
                                    {customer.ordersByCustomer.length}
                                </td>

                                {/* <td>
                                    {customer.ordersByCustomer.map((order, index) =>
                                        <p key={index} style={{ lineHeight: '50%', margin: '1%' }}>
                                            <Button variant="outline-info" style={{ fontSize: '9px', margin: '1%', padding: '0' }}
                                                // onClick={() => this.viewTrAccountDetails(acc.id)}
                                                >
                                                {order.orderNr + " (Id: " + order.carId + ")"}
                                            </Button> </p>
                                    )}
                                </td> */}

                                <td>
                                    <Button className="neutral-btn info-btn" id={customer.id} variant="primary" onClick={viewCustomerOrders}>
                                    <span className="not-clickable-part"><FontAwesomeIcon icon={faInfo} /> 
                                   </span>
                                    </Button>{" "}
                                    {/* <Button variant="danger" onClick={() => deleteTrAccount(trAccount.id)}>Delete</Button> */}
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
        </div >
    );
}

export default ListAllCarsComponent;