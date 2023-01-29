import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/WelcomeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListAllCarsComponent from './components/ListAllCarsComponent';
import ListCarsByTypeComponent from './components/ListCarsByTypeComponent';
import AddCarComponent from './components/AddCarComponent';
import ListCustomersComponent from  './components/ListCustomersComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import ViewCarComponent from './components/ViewCarComponent';
import UpdateCarComponent from './components/UpdateCarComponent';

// Arrange routing hierarchy and structure
function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={< WelcomeComponent />} exact></Route>

            {/* Customer related rendering  */}
            {/* <Route path="/customers" element={< ListCustomerComponent />}></Route>
            <Route path="/view-customer/:id" element={<ViewCustomerComponent />}></Route>
            <Route path="/create-customer/:id" element={<CreateCustomerComponent />}></Route>
            <Route path="/update-customer/:id" element={<UpdateCustomerComponent />}></Route> */}

            {/* TransactionAccount related rendering  */}
            {/* <Route path="/tr-accounts" element={< ListTransactionAccountComponent />}></Route>
            <Route path="/view-traccount/:id" element={< ViewTrAccountComponent />}></Route>
            <Route path="/create-traccount/:id" element={<CreateTrAccountComponent />}></Route>
            <Route path="/update-traccount/:id" element={<UpdateTrAccountComponent />}></Route> */}

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
    </div>
  );
}

export default App;
