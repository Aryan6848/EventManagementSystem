import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    console.warn(username, password);

        let result =   await fetch("http://localhost:5000/login", {
            method :'post',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password,userType}),
            
        }) ;
        result = await result.json(); // fetch string m data return krta h usko json m convert krenge ar json() function bhi promise return krta h to await lga k hnadle krenge
        console.log(result);
        if(result.name){
            localStorage.setItem('user', JSON.stringify(result));//local storage m jo store krte h usme json store nhi hota usko stringify krna pdta h 
            switch (userType) {
                case 'customer':
                  navigate('/customer');
                  break;
                case 'admin':
                  navigate('/admin');
                  break;
                case 'vendor':
                  navigate('/vendor');
                  break;
                default:
                  break;
              }
        }else{
            alert("Please Enter Correct Details ");
        }
    
      
      
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-3">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type:</label>
              <select className="form-select" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p className="mt-3">{message}</p>
          </form>
          <div className="mt-3">
            <p>Don't have an account? <Link to="/Signup" className="btn btn-link">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
