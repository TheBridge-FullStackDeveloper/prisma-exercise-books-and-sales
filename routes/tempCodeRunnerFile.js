const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const books = await prisma.libro.findMany();
        res.json(books)
        console.log(books)
    } catch (e) {
        console.log(e);
        res.json('Server error')
    }
})

module.exports = router;
