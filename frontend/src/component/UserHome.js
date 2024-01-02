import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './UserHome.css'


const UserHome = () => {
  const [products, setProducts] = useState([]);

//   const products = [ 
//       { id: 1, productName: 'Rose Flower', description: 'Specializing in roses and floral arrangements.', vendorName: 'vendor1', price:120 },
//       { id: 2, productName: 'food item ', description: 'Specializing in roses and floral arrangements.', vendorName: 'vendor2', price:150 },
//       { id: 3, productName: 'sound system', description: 'Specializing in roses and floral arrangements.', vendorName: 'vendor3', price:110 },
//       { id: 4, productName: 'party rentals', description: 'Specializing in roses and floral arrangements.', vendorName: 'vendor4', price:1220 },
//       { id: 5, productName: 'Rose Florist', description: 'Specializing in roses and floral arrangements.', vendorName: 'vendor5', price:1220 }, 
// ]


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); // Replace with your API endpoint for fetching products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

 

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.product}</h3>
            <p ><span style={{fontWeight:'530', paddingRight:'5px',color:'black'} }>Vendor:</span>{product.username}</p>
            <p><span style={{fontWeight:'530', paddingRight:'4px', color:'black'} }>Description: </span> {product.description}</p>
            <p><span style={{fontWeight:'530', paddingRight:'4px', color:'#8f0000'} }>Price:</span> <span style={{color:'#8f0000'}}>${product.price}</span></p>
            <button>Shop</button>
            {/* <button >Add to Cart</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
