const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserItem = require('../models/UserModel');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = 'thee_kade';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try{
        const user =await UserItem.findOne({ username });
        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
  
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
  
    
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
        res.json({"access_token": token, "message": "Login Success","role":user.role});
    }catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });


router.post('/register', async (req, res) => {
    const { username, user_password, role } = req.body;
    try {
        password = await bcrypt.hash(user_password, 10);
        const user = await UserItem.create({ username, password, role });
        res.json({ message: 'User created', user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/addUser',
    authMiddleware(['admin']),
    async (req, res) => {
        console.log(req.body);
        const { username, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserItem.create({ username, password: hashedPassword, role });
            res.json({ message: 'User created', user });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
);

module.exports = router;