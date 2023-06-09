const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
const PORT = 5000 |  process.env.PORT;
app.use(express.json( {extended: false}));


app.get('/' , (req , res) =>{

    res.send("Root path of server.")
})

// Define router;

app.use("/api/users" , require('./routes/api/users'));
app.use("/api/post" , require('./routes/api/post'));
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/profile" , require('./routes/api/profile'));
app.listen(PORT , ()=>{

    console.log(`Listening on port ${PORT}`)
})