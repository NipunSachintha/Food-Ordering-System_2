const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserItem = require('../models/UserModel');

const JWT_SECRET = 'thee_kade';

/*router.post('/login', async (req, res) => {
    try {
        const user = await UserItem.find({username:req.body.username,password:req.body.password});
        res.json(user);

    } catch (err) {
        res.json({ message: err });
    }
});
*/


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try{
        const user =await UserItem.findOne({ username });
        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
  
    
        //const passwordMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
  
    
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
        res.json({"access_token": token, "message": "Login Success","role":user.role});
    }catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });

module.exports = router;