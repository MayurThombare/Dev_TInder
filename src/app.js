const express = require('express');

const app = express();

app.use('/test',(req,res)=>{
    res.send('test');
});

const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on port  ${port}`);
})