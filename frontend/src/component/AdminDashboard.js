import React , {useState, useEffect} from "react";
import './AdminDashboard.css';
import { Link } from "react-router-dom";

const AdminDashboard =()=>{

        const [items, setItems]=useState([]);
    

        useEffect(()=>{
            getItems();
    
            const interval = setInterval(() => {
                getItems(); // Call getItems() every 10 seconds
            }, 10000); // Interval set to 10 seconds (10000 milliseconds)
    
            return () => clearInterval(interval);
        },[])
        const getItems =async () =>{
          let result = await fetch("http://localhost:5000/adminitems"); //fetch promise return krta h
          
          result = await result.json(); // json() ye bhi promise return krta h 
          setItems(result);
        }
    
        const deleteProduct= async (id) =>{
            let result = await fetch(`http://localhost:5000/items/${id}`,{
                method:"Delete",
            });
            result = await result.json()
            if(result){
                
                getItems(); 
                // delete hone k badd sare products ko phir se get krega to jo delete ho chuki h wo chli jaegi 
            }
    
        }
        const searchHandle = async (event)=>{
            let key = event.target.value;
            if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            
            result = await result.json();
            if(result){
                setItems(result);
            }
        }else{
            //agar jaise hi input box se sb earse kroge to sare products aa jane chahiye pr nhi ayenge to usko handle krne ke liye
            //ye kiye h ki agar key m kuch h to wo chle agar key m kuch nhi h to sare products aa jae .
            getItems();
        }
    
        }
    
    
        return (
            <div className="product-list">
                <h1>Items List</h1>
                <input className="search-product-box" type = "text" placeholder = 'Search Product' onChange={searchHandle}></input>
                <ul>
                    <li>S.No</li>
                    <li>Name</li>
                    <li>vendor/User</li>
                    <li>ProductName</li>
                    <li>Price in $</li>
                    <li>status</li>
                    <li>Handle user</li>
                </ul>
                {
                    items.map( (item,index) =>
                        <ul key = {item._id}> 
                        {/* key m item ki id aa jaegi */}
                        <li>{index+1}</li>
                        <li>{item.username}</li>
                        <li>{item.userType}</li>
                        <li>{item.product}</li>
                        <li>{item.price}</li>
                        <li>{item.status}</li>
                        <li>
                            <button className="delete-button" onClick = {()=> deleteProduct(item._id)}>Delete</button>
                            
                            <Link to ={"/update/" + item._id}><button className="update-button" >status</button></Link>
                        </li>
                    </ul>
                    )
                }
            </div>
        )

}
export default AdminDashboard;