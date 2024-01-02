import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './VendorForm.css'; // Your custom CSS file
import { useNavigate } from 'react-router-dom';

const VendorForm = () => {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [status,setStatus] = useState('on Progress');
  const [price,setPrice] = useState('');
  
  const navigate = useNavigate();

  const collectData = async(e) =>{
    e.preventDefault();
    console.log("before fetch");
    console.warn(product,description);
    const auth = localStorage.getItem('user');
    const currentuser = auth ? JSON.parse(auth).username : '';
    const info = {
        username:currentuser,
        product:product,
        description:description,
        status:status,
        price:price,
    }
    console.log(info);
    try{
        let result = await fetch("http://localhost:5000/vendorform",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(info)
        });
        console.log("After fetch");
        result = await result.json();
        console.warn(result);
        if(result){
            navigate("/vendor");
        }
    }catch(error){
        console.error("Error sending request:", error);
    }

    // e.preventDefault();
    console.log('Form submitted:', { product, description });
    setProduct('');
    setDescription('');
  }

  const handleSubjectChange = (e) => {
    setProduct(e.target.value);
  };

  const handleIssueMessageChange = (e) => {
    setDescription(e.target.value);
  };
  

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', { product, description, screenshot });
  //   setProduct('');
  //   setDescription('');
  //   setScreenshot(null);
  // };

  return (
    <div className="ticket-form container mt-4">
      <h2 className="mb-4">Add a Product</h2>
      <form onSubmit={collectData}>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Product Name:</label>
          <input
            type="text"
            id="product"
            value={product}
            onChange={handleSubjectChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Product Detail:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleIssueMessageChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Product Price:</label>
          <textarea
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="form-control"
            required
          />
        </div>
      
         
        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};


export default VendorForm;
