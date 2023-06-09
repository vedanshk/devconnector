const express = require('express');

const PORT = 5000 |  process.env.PORT;

const app = express();


app.get('/' , (req , res) =>{

    res.send("Root path of server.")
})

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`)
})