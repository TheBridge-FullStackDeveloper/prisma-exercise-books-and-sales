const express = require('express');
const router = express.Router();

const booksRoutes = require('./books');
const salesRoutes = require('./sales');

router.use('/books', booksRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
