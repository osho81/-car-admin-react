import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { Card, Table, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// Fontawsome for react; combine into an element before usage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewCustomerComponent(props) {

    const navigate = useNavigate();

    // Variables, states
    const [customer, setCustomer] = useState('');
    const { id } = useParams(); // get id param from current url


    useEffect(() => { // Get customer with aquired

        async function getCust() {
            CustomerService.getAllCustomers().then((response) => {
                response.data.map((customer) => {
                    if (customer.id === Number(id)) { // Find specific customer
                        setCustomer(customer);
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }
        getCust();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    //   const editCustomer = () => {
    //     navigate(`/update-customer/${id}`);
    //   }

    const backToListCustomers = () => {
        navigate('/customers', { replace: true });
    }




    return (
        <Container style={{ marginTop: '3%', marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>

            <Card style={{ marginLeft: '15%', width: '70%' }}>
                <Card.Body>
                    <Card.Title>Details for customer with id {customer.id}</Card.Title>
                </Card.Body>

                {/* Table with no table head, only table body */}
                <Table striped bordered hover>
                    <tbody style={{ fontWeight: 500 }}>
                        <tr>
                            <td>Customer ID</td>
                            <td>{customer.id}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{customer.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>Social security number</td>
                            <td>{customer.ssn}</td>
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
                        <tr>
                            <td>Email</td>
                            <td>{customer.email}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Body>
                    {/* <Button variant="primary" onClick={editCustomer}>Edit</Button>{' '} */}

                    <Button className="neutral-btn broad-btn" variant="warning" onClick={backToListCustomers}>
                        <span className="not-clickable-part"><FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                    </Button>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default ViewCustomerComponent;