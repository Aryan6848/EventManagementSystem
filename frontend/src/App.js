// App.js (or your main file)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
// import CustomerDashboard from './component/CustomerDashboard';

import AdminDashboard from './component/AdminDashboard';
import VendorDashboard from './component/VendorDashboard';
import Signup from './component/Signup';
import VendorForm from './component/VendorForm';
import AdminUpdateStatus from'./component/AdminUpdateStatus';
import UserHome from './component/UserHome';
import VendorUpdate from './component/VendorUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/Signup" element= {<Signup/>}/>
        <Route path="/customer" element={<UserHome/>} />
      
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/vendor" element={<VendorDashboard/>} />
        <Route path="/vendorForm" element = {<VendorForm/>}></Route>
        <Route path='/update/:id' element = {<AdminUpdateStatus/>}></Route>
        <Route path = '/vendorupdate/:id' element = {<VendorUpdate/>}/>
      </Routes>
    </Router>
  );
}

export default App;
