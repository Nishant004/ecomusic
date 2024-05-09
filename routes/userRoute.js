const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middleware/authmiddleware');





router.post('/register', async (req, res) => {

    try {
        const password = req.body.password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword
        const user = new User(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: 'User already exists', success: false });
        } else {
            await user.save();
            return res.status(200).send({ message: 'User created successfully', success: true });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message, success: false });

    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User does not exist', success: false });
        }
        const passwordsMatch = await bcrypt.compareSync(req.body.password, user.password);
        if (passwordsMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
            return res.status(200).send({ message: 'User login successful', success: true, data: token });
        } else {
            return res.status(200).send({ message: 'Incorrect password', success: false });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false });

    }
})

router.post('/get-user-data', authmiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        user.password = undefined;
        return res.status(200).send({ message: 'User data fetched successfully', success: true, data: user });

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false });

    }
});

module.exports = router;