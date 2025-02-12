const express = require('express')

const cors = require('cors');
const dotenv = require('dotenv');

const app = express()

app.use(express.json());
app.use(cors()); 
const db = require('./db');


const orderRoute=require('./routes/orderRoute');
const adminRoute=require('./routes/adminRoute');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/orders',orderRoute);
app.use('/api/admin',adminRoute);


const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})