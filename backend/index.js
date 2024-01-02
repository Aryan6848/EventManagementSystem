const express = require('express'); // Express.js for creating a web server
const cors = require("cors");// CORS middleware for handling cross-origin requests
require('./db/config');  // Assuming this line sets up your database connection
const User = require("./db/User") // Importing the User model
// const User = require("./db/Product");
const Product = require('./db/Product');
const session =require('express-session');

const app =express();  // Create an Express application

app.use(express.json());  // Parse JSON request bodies
app.use(cors({ origin: 'http://localhost:3000', // Allow requests from this origin (your React frontend)
credentials: true,}));  // Enable credentials (like cookies and headers) to be sent
app.use(express.urlencoded({extended:true}));  // Parse URL-encoded request bodies


app.use(session({
    secret:'meinkyubatau',
    resave:false,
    saveUninitialized:true,
})
);



// Define a POST route for handling sign-up requests
app.post('/signup', async(req,resp)=>{
    try{
    // Create a new User instance based on the data in the request body
    let user = new User(req.body);
    // Save the user to the database
    let result = await user.save();
        
     delete result.password;
    console.log(req.body);
    // Send a response with the result of the user save operation
    resp.send(result);
    }catch(error){
        console.error("Error in signup route:", error);
    resp.status(500).send("Internal Server Error");
    }
});


app.post('/login', async(req, resp)=>{
    console.log("login chala");
    // const {username,password} = req.body;
    if(req.body.username && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        console.log(user);
        if(user){
            // req.session.username = user.username;
            resp.send(user)
        }
        else{
            resp.send({result:'No user found'})
        }
    }else{
        resp.send({result:'No User Found'})
    }
})










//vendor form handling
app.post('/vendorform',async(req,resp)=>{
    console.log("m chl gya");
    try{

        let product = new Product(req.body);
        console.log(product);
        let result = await product.save();

        console.log(req.body);
        resp.status(200).json(result);
    }
    catch(error){
        console.error("Error in saving product:", error);
        resp.status(500).send("Internal Server Error");
    }
})

app.get('/vendor', async(req,resp)=>{
   
    // console.log(req.session, req.session.username)

    let tickets = await Product.find();
    console.log("request aa gayi ");
    console.log(tickets);
    if(tickets.length>0){
        resp.send(tickets);
    }else{
        resp.send({result:"No product found"});
    }
})

app.delete('/vendor/:id', async(req,resp)=>{
    console.log("delete chala");
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});


//vendor product update krne pe us product ka data bjene k liye api 
app.get("/vendor/:id",async (req,resp)=>{
    console.log("Vendor Update chala");
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No record found"});
    }

})


//update krne pe us product ka data ko database m update krne k liye 
app.put('/vendor/:id', async(req,resp)=>{
    console.log("vendor product is updating ")
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        )

        resp.send(result)
})

//vendor handling over....












//admin handling start
app.get('/adminitems', async(req,resp)=>{
   
    // console.log(req.session, req.session.username)

    let products = await Product.find();
    
    
    // product.map( async(item)=>{
    //     let user = await User.findOne({username:item.username});
    //     console.log(user.userType);
    //     // item = {...item , userType:user.userType}
    //     Object.assign(item,{userType:user.userType})
    // })
    
    const promises = products.map(async (item) => {
        let user = await User.findOne({ username: item.username });
        if (user) {
            return { ...item.toObject(), userType: user.userType };
        }
    });

    const productsWithUserType = await Promise.all(promises);

    
    console.log("admin req aa gayi ");
    console.log(productsWithUserType);
    if(productsWithUserType.length>0){
        resp.send(productsWithUserType);
    }else{
        resp.send({result:"No product found"});
    }
})

app.get("/items/:id",async(req,resp)=>{
    console.log("update chala");
    let result = await Product.findOne({_id:req.params.id});
    if(result){
       resp.send(result);
    }else{
       resp.send({result:"No record found"});
    }
})

app.put('/items/:id', async (req,resp) =>{
    let result = await Product.updateOne(
          {_id:req.params.id},
          {
            $set:{status:req.body.status}
          }
        )
        resp.send(result)
})

app.delete('/items/:id', async(req,resp)=>{
    console.log("delete chala");
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});















//user handling
app.get('/products',async(req,res)=>{
    let products =await Product.find();
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send("no product found");
    }
})


// Start the Express server and listen on port 5000
app.listen(5000 , ()=>{
    console.log("Db connected");
});