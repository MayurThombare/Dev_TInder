const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("user data sent");
});

app.get('/getUserdata',(req,res)=>{
    // try{
        throw new Error('hashsghsbgdd');

    //     res.send('user data sent');
    // } catch(err){
    //     res.status(500).send('something went wrong');
    // }

    
})

app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send('something went wrong');

    }
})

const port = 3000;

app.listen(port, () => {
  console.log(`server running on port  ${port}`);
});
