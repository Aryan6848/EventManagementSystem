import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const[name,setName]= useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('customer');
  const navigate = useNavigate();
  
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    //agar user sign in h pr tb bhi signin wale route ko daale to usko signup page nhi blki homepage dikhe
    if(auth)
    {
        navigate('/');
    }
})
const collectData = async()=>{
    console.log("before fetch")
    console.warn(name,username, password);
    const info ={
        name:name,
        username:username,
        password:password,
        userType:userType,
    }
    console.log(info)
    try{
    let  result  = await fetch("http://localhost:5000/signup",{
         method:'post',
         headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
         body:JSON.stringify(info)
    });
    console.log("After fetch");
    result = await result.json();
    console.warn(result);
    // localStorage.setItem("user", JSON.stringify(result));
    // server se jo data aya h usko browser local storeage m store krenge , page refresh kr do tbbhi data yha rhega browser close kr do tb bhi data yha rhega ,
    if(result){
        navigate("/");
        // agar result successfully aa jata h to root wale path pe redirect kr denge 
    }
}catch(error){
    console.error("Error sending request:", error);
}
   
}
  const handleSubmit = async (e) => {
   
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
              <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type:</label>
              <select className="form-select" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <button onClick={collectData} type="submit" className="btn btn-primary">Sign Up</button>
            <p className="mt-3">{message}</p>
            <div className="mt-3">
            <p>Already have an account? <Link to="/" className="btn btn-link">Login</Link></p>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
