import React, { useState, useEffect } from 'react';
import './VendorDashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import {Link, useNavigate} from 'react-router-dom'


const VendorDashboard = ()=>{
    const navigate = useNavigate()
  // Sample ticket data (replace this with your actual ticket data)
  const [items, setItems] = useState([
    // { id: 1, product: 'Issue 1', description: 'Description of issue 1'},
    // { id: 2, product: 'Issue 2', description: 'Description of issue 2'},
    // { id: 3, subject: 'Issue 3', issueMessage: 'Description of issue 3', screenshot: null },
    // { id: 4, subject: 'Issue 4', issueMessage: 'Description of issue 4', screenshot: null },
    // // Add more ticket objects as needed
  ]);

   useEffect(()=>{
    getItems();
    const interval = setInterval(()=>{
        getItems();
    },30000)
  },[])

  const getItems= async() =>{
    let result = await fetch("http://localhost:5000/vendor");

    result = await result.json();
    setItems(result);
    
  } 

//   // Function to delete a ticket by ID
  const handleDelete = async (id) => {
    // const updatedTickets = items.filter((ticket) => ticket.id !== id);
    // setItems(updatedTickets);
    let result = await fetch(`http://localhost:5000/vendor/${id}`,{
      method:"Delete",

    });
    result =await result.json()
    if(result){
      getItems();
    }

    

  };

  const handleAddProduct =()=>{
    navigate('/vendorForm')
};
  

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className='button-div'>
        <button className="button" onClick={()=>handleAddProduct()}>Add Product</button>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {items.map((ticket) => (
          <div key={ticket._id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ticket.product}</h5>
                <p className="card-text">{ticket.description}</p>
                <p className='card-text'>Price:${ticket.price}</p>
                { ticket.status === "on Progress" ? (<p className='card-status text-danger'>Pending</p>)
                   : 
                (<p className='card-status text-green'>{ticket.status}</p>)
                } 
               
               
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ticket._id)}
                >
                  Delete
                </button>
               
                <Link to = {"/vendorupdate/" + ticket._id}> <button  className="btn btn-danger" >Update</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;