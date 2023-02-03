import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import WelcomeComponent from './components/WelcomeComponent';
import AdminInfoComponent from './components/AdminInfoComponent';
import ListAllCarsComponent from './components/ListAllCarsComponent';
import ListCarsByTypeComponent from './components/ListCarsByTypeComponent';
import AddCarComponent from './components/AddCarComponent';
import ListCustomersComponent from './components/ListCustomersComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import ViewCarComponent from './components/ViewCarComponent';
import UpdateCarComponent from './components/UpdateCarComponent';

// Keycloak:
// import keycloak from "./Keycloak" // This was used to import file with keycloak-js configs
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
// see keycloak elements in returned code hereunder

// Arrange routing hierarchy and structure
function App() {

  // Keycloag configurations 
  const keycloak = new Keycloak({
    url: "http://localhost:8080", // Auth not needed with Quarkus-keycloak
    realm: "car-rental-realm",
    clientId: "car-rental-v100",
    //  onLoad: 'login-required' 
  });

  const keycloakProviderInitConfig = {
    onLoad: 'login-required',
  }


  return (
    <div>

      <ReactKeycloakProvider
        authClient={keycloak}
        // keycloak={keycloak}
        initOptions={keycloakProviderInitConfig}
      // initOptions={{ onLoad: 'login-required' }}
      >
        <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={< WelcomeComponent />} exact></Route>
              <Route path="/admininfo" element={< AdminInfoComponent />}></Route>

              {/* Car related rendering */}
              <Route path="/allcars" element={<ListAllCarsComponent />}></Route>
              <Route path="/customers" element={<ListCustomersComponent />}></Route>

              {/* Send in props.type or other data from this parent to these children: */}
              <Route path="/minicars" element={<ListCarsByTypeComponent type="mini" />}></Route>
              <Route path="/sedancars" element={<ListCarsByTypeComponent type="sedan" />}></Route>
              <Route path="/sportcars" element={<ListCarsByTypeComponent type="sport" />}></Route>
              <Route path="/cabcars" element={<ListCarsByTypeComponent type="cab" />}></Route>
              <Route path="/suvcars" element={<ListCarsByTypeComponent type="suv" />}></Route>
              <Route path="/buscars" element={<ListCarsByTypeComponent type="bus" />}></Route>

              <Route path="/addcar" element={<AddCarComponent />}></Route>

              <Route path="/customer/:id" element={<ViewCustomerComponent />}></Route>
              <Route path="/car/:id" element={<ViewCarComponent />}></Route>

              <Route path="/update-car-view/:id" element={<UpdateCarComponent />}></Route>

            </Routes>
          </div>
          <FooterComponent />
        </Router>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
