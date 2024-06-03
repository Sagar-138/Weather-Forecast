const express=require('express');
const axios=require('axios');
const weatherRoutes=require('./routes/weatherRoutes');
const dotenv = require('dotenv');



dotenv.config();
const app=express();


app.use(express.json());

app.use('/api/weather',weatherRoutes);


app.get('/', function(req, res){
    res.send('welcome to weather forecast system');
})

const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});