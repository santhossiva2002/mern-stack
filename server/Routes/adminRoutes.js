const express = require('express');
const { adminLogin } = require('../Controllers/adminController');

const router = express.Router();

router.post('/admin-login', adminLogin);

module.exports = router;
