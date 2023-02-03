import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useKeycloak } from '@react-keycloak/web';

function AdminInfoComponent(props) {

    const { keycloak, initialized } = useKeycloak()

    // Variables, states
    // const [keycloak, setKeycloak] = useState(keycloak1);


    useEffect(() => { // Get customer with aquired

        // During dev, to see keycloak details
        const updateKeycl = () => {
            keycloak.updateToken(30).then(function () {
                console.log(keycloak.token);
            }).catch(function () {
                alert('Failed to refresh token');
            });
        }

        const loadKeycl = () => {
            keycloak.loadUserProfile()
                .then(function (profile) {
                    console.log(JSON.stringify(profile, null, "  "))
                }).catch(function () {
                    console.log('Failed to load user profile');
                });
        }
        loadKeycl();
        updateKeycl();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <Container style={{ marginTop: '3%', marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center', fontSize: "16px" }}>

            <h3 className='list-header'>Signed in admin</h3>
            <Table striped bordered hover>
                <tbody style={{ fontWeight: 500 }}>
                    <tr>
                        <td>User name</td>
                        <td>{keycloak.tokenParsed.preferred_username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{keycloak.tokenParsed.email}</td>
                    </tr>
                    <tr>
                        <td>First name</td>
                        <td>{keycloak.tokenParsed.given_name}</td>
                    </tr>
                    <tr>
                        <td>Last name</td>
                        <td>{keycloak.tokenParsed.family_name}</td>
                    </tr>
                </tbody>
            </Table>
        </Container >
    );
}

export default AdminInfoComponent;