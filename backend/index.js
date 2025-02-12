const express = require('express')

const cors = require('cors');


const app = express()

app.use(express.json());
app.use(cors()); 



const orderRoute=require('./routes/orderRoute');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/orders',orderRoute);


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})