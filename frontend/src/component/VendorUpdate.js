import React, { useEffect } from "react";
import './VendorUpdate.css'
import {json, useParams,useNavigate} from 'react-router-dom'


const VendorUpdate = ()=>{
      
    const [product,setProduct] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [description, setDescription] = React.useState("")
    const params = useParams();
    const navigate = useNavigate();
    // isko hme ek hi bar call krna sh jb page hamara load ho uskeliye useEffect hook use krenge
    useEffect(()=>{
        getProductDetails();
    },[])
    
    const getProductDetails = async () =>{
        let result = await fetch(`http://localhost:5000/vendor/${params.id}`);
        result = await result.json();
        //prefilling data
        setProduct(result.product);
        setPrice(result.price);
        setDescription(result.description);
        
    }

    const handleUpdateProduct =async () => {
        console.warn(product,price,description);
        let result = await fetch(`http://localhost:5000/vendor/${params.id}`,{
            method:'Put',
            body:JSON.stringify({product,price,description}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        result = await result.json();
        if(result){
            navigate('/vendor'); //update krne k baad product list wale page pe redirect kr dega 
        }
    } 

    return (
        <div className="product">
            <h1>update product</h1>
            <input className="input-field" type="text" placeholder="Enter product product" value= {product} onChange = {(e)=>{setProduct(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter description" value = {description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <button className="addProductButton" onClick={handleUpdateProduct}>Update Products</button>
            {/* <button classproduct="addProductButton">Update Products</button> */}
        </div>
    )
}

export default VendorUpdate;
