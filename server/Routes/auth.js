const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/authUser');

// const users = [];

// router.get('/', (req, res) => {
//   res.json(users);
// });

router.post('/signup', register);

router.post('/login', login);

module.exports = router;
