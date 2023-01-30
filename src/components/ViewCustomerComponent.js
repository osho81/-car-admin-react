import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { Alert, Card, Table, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewCustomerComponent(props) {

    const navigate = useNavigate();

    const [showOrNot, setShowOrNot] = useState("none"); // Display: none

    const [show, setShow] = useState(false); // for alerting that orders list is empty

    // Variables, states
    const [customer, setCustomer] = useState('');
    const [orders, setOrders] = useState('');
    const { id } = useParams(); // get id param from current url


    useEffect(() => { // Get customer with aquired

        async function getCust() {
            CustomerService.getAllCustomers().then((response) => {
                response.data.map((customer) => {
                    if (customer.id === Number(id)) { // Find specific customer
                        setCustomer(customer);
                        setOrders(customer.ordersByCustomer);
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }
        getCust();


    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const backToListCustomers = () => {
        navigate('/customers', { replace: true });
    }

    const showOrders = () => {

        if (orders.length != 0) { // If not empty orders list
            showOrNot == "none" ? setShowOrNot("initial") : setShowOrNot("none");
        } else if (orders.length == 0) {
            setShow(true);
        }

        // showOrNot == "none" ? setShowOrNot("initial") : setShowOrNot("none");
    }



    return (
        <Container style={{ marginTop: '3%', marginBottom: '5%', width: '100%', justifyContent: 'center', fontSize: "12px" }}>

            <Card style={{ marginLeft: '25%', width: '50%' }}>
                <Card.Body>
                    <Card.Title>Details for customer with id {customer.id}</Card.Title>
                </Card.Body>

                {/* Table with no table head, only table body */}
                <Table striped bordered hover>
                    <tbody style={{ fontWeight: 500 }}>
                        <tr>
                            <td>Social security number</td>
                            <td>{customer.ssn}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{customer.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>First name</td>
                            <td>{customer.fName}</td>
                        </tr>
                        <tr>
                            <td>Last name</td>
                            <td>{customer.lName}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{customer.address}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Body>

                    <div className='separate-btns-row'>

                        <Button className="neutral-btn broad-btn" variant="warning" onClick={backToListCustomers}>
                            <span className="not-clickable-part"><FontAwesomeIcon icon={faArrowLeft} />
                            </span>
                        </Button>
                        <Button variant="primary" onClick={showOrders}>Orders</Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Alert box in case orders are empty; instead of rendering table of orders */}
            <div style={{  width: "40%",  marginLeft: '30%', marginTop: "1%" }}>
                <Alert show={show} variant="info">
                    <h6>Customer with id {customer.id} has no orders yet</h6>
                    <div className="d-flex justify-content-center">
                        <Button className="neutral-btn" onClick={() => setShow(false)}>
                            OK
                        </Button>
                    </div>
                </Alert>
            </div>

            <div id='orders-by-customer-div' style={{ display: showOrNot, width: "90%", marginLeft: '5%', marginBottom: '5%' }}>
                <h5 className='list-header'>Customer orders</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Nr</th>
                            <th>Canceled?</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Num of days</th>
                            {/* <th>Customer id</th> */}
                            <th>Car id</th>
                            <th>Price, SEK</th>
                            {/* <th>Price, Euro</th> */}
                        </tr>
                    </thead>

                    <tbody style={{ fontWeight: "500" }}>
                        {Object.entries(orders).map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td> {orders[index].orderNr} </td>
                                    <td> {orders[index].canceled ? "Yes" : "No"} </td>
                                    <td> {orders[index].firstRentalDay} </td>
                                    <td> {orders[index].lastRentalDay} </td>
                                    <td> {orders[index].numberOfDays} </td>
                                    {/* <td> {orders[index].customerId} </td> */}
                                    <td> {orders[index].carId} </td>
                                    <td> {orders[index].price} </td>
                                    {/* <td> {orders[index].priceInEuro} </td> */}
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </Table>
            </div >


        </Container >

    );
}

export default ViewCustomerComponent;