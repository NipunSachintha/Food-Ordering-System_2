const express = require('express')

const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});



app.use(express.json());
app.use(cors()); 
const db = require('./db');


const orderRoute=require('./routes/orderRoute')(io);
const adminRoute=require('./routes/adminRoute');
const foodRoute=require('./routes/foodRoute');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/orders',orderRoute);
app.use('/api/admin',adminRoute);
app.use('/api/food',foodRoute);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

