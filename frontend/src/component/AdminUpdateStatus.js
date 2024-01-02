import React, {useEffect} from "react";

import './AdminUpdateStatus.css'

import {useParams, useNavigate} from 'react-router-dom'

const UpdateStatus = ()=>{
    const [status, setStatus] = React.useState("");
    const params = useParams();

    const navigate = useNavigate();
    
    useEffect(()=>{
        getTicketDetails();
    },[])

    const getTicketDetails = async () =>{
        let result = await fetch(`http://localhost:5000/items/${params.id}`);

        result= await result.json();

        setStatus(result.status);
    }

    const handleUpdateTicket =async()=>{
        console.warn(status);
        let result = await fetch (`http://localhost:5000/items/${params.id}`,{
            method:'Put',
            body:JSON.stringify({status}),
            headers:{
                'Content-Type':"application/json",
            }
        });
        result = await result.json();

        if(result){
            navigate('/admin');
        }
    }

    return (
        <div className="ticket">
           <h1>Update Status </h1>
           <input className="input-field" type ="text" placeholder="Enter ticket status" value ={status} onChange ={(e)=>{setStatus(e.target.value)}}></input>
           <button className = "updateTicketButton" onClick={handleUpdateTicket}>Update Ticket</button>
        </div>
    )
}

export default UpdateStatus;