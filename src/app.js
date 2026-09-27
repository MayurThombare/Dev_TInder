const express = require('express');

const app = express();


app.use("/user",(req,res,next)=>{
    // res.send('Route Handler 1');
    console.log('route');
    next();

},(req,res,next)=>{
    console.log('2nd route handler');
    res.send('route 2');
})
const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on port  ${port}`);
})