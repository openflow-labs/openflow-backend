const express = require('express');
const { processEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/upload-email', processEmail);

module.exports = router;
