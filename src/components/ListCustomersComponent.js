import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

// For more comments see ListAllCarsComponent

function ListAllCustomersComponent(props) {

    const navigate = useNavigate();

    const [ssnArrow, setSsnArrow] = useState(faSortDown);
    const [emailArrow, setEmailArrow] = useState(faSortDown);
    const [lNameArrow, setLNameArrow] = useState(faSortDown);
    const [numOrdersArrow, setNumOrdersArrow] = useState(faSortDown);

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

    const sortTable = async (e) => {
        // Get id from clicked sort span-btn i tablehead
        const currentId = await e.target.id;

        switch (currentId) {
            case "ssn": // Alphabetical (even if here the numbers are in string)
                let sorted1;

                for (let i = 0; i < allCustomers.length - 1; i++) {
                    if (allCustomers[i].ssn.localeCompare(allCustomers[i + 1].ssn) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true;
                    }
                }

                if (sorted1) {
                    setAllCustomers(allCustomers.sort((a, b) => b.ssn.localeCompare(a.ssn)));
                    setSsnArrow(faSortUp);
                } else {
                    setAllCustomers(allCustomers.sort((a, b) => a.ssn.localeCompare(b.ssn)));
                    setSsnArrow(faSortDown);
                }
                break;

            case "email": // Alphabetical
                let sorted2;
                for (let i = 0; i < allCustomers.length - 1; i++) {
                    if (allCustomers[i].email.localeCompare(allCustomers[i + 1].email) == 1) {
                        sorted2 = false;
                        break;
                    } else {
                        sorted2 = true;
                    }
                }
                if (sorted2) {
                    setAllCustomers(allCustomers.sort((a, b) => b.email.localeCompare(a.email)));
                    setEmailArrow(faSortUp);
                } else {
                    setAllCustomers(allCustomers.sort((a, b) => a.email.localeCompare(b.email)));
                    setEmailArrow(faSortDown);
                }
                break;

                case "lName": // Alphabetical
                let sorted3;
                for (let i = 0; i < allCustomers.length - 1; i++) {
                    if (allCustomers[i].lName.localeCompare(allCustomers[i + 1].lName) == 1) {
                        sorted3 = false;
                        break;
                    } else {
                        sorted3 = true;
                    }
                }
                if (sorted3) {
                    setAllCustomers(allCustomers.sort((a, b) => b.lName.localeCompare(a.lName)));
                    setLNameArrow(faSortUp);
                } else {
                    setAllCustomers(allCustomers.sort((a, b) => a.lName.localeCompare(b.lName)));
                    setLNameArrow(faSortDown);
                }
                break;
        }

        navigate('/customers', { replace: true });
    }

    return (
        <div style={{ width: "60%", marginLeft: '20%', marginBottom: '5%' }}>
            <h2 className='list-header'>All Customers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th><span id='ssn' variant="primary" onClick={sortTable}>
                            SSN <span className="not-clickable-part">
                                <FontAwesomeIcon icon={ssnArrow} />
                            </span></span></th>
                        {/* <th>Date of Birth</th> */}
                        <th><span id='email' variant="primary" onClick={sortTable}>
                            Email <span className="not-clickable-part">
                                <FontAwesomeIcon icon={emailArrow} />
                            </span></span></th>
                        {/* <th>First Name</th> */}
                        <th><span id='lName' variant="primary" onClick={sortTable}>
                            Last name <span className="not-clickable-part">
                                <FontAwesomeIcon icon={lNameArrow} />
                            </span></span></th>
                        {/* <th>Address</th> */}
                        <th><span id='numOrders' variant="primary" onClick={sortTable}>
                            Number of orders <span className="not-clickable-part">
                                <FontAwesomeIcon icon={numOrdersArrow} />
                            </span></span></th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody style={{ fontWeight: 500 }}>
                    {allCustomers.map((customer, index) => {
                        return (
                            <tr key={index}>
                                {/* <td> {customer.id} </td> */}
                                <td> {customer.ssn} </td>
                                {/* <td> {customer.dateOfBirth} </td> */}
                                <td> {customer.email} </td>
                                {/* <td> {customer.fName} </td> */}
                                <td> {customer.lName} </td>
                                {/* <td> {customer.address} </td> */}

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

export default ListAllCustomersComponent;