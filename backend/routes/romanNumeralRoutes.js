const express = require('express');
const { toRoman } = require('../services/RomanCalcService'); 

const router = express.Router();

router.get('/', (req, res) => {
    const numberFromQuery = req.query.number;
    if (!numberFromQuery) {
        return res.status(400).json({ error: 'Missing query parameter: number' });
    }

    const number = parseInt(numberFromQuery, 10);

    if (isNaN(number)) {
        return res.status(400).json({ error: 'Query parameter "number" must be a number' });
    }

    const roman = toRoman(number);
    res.json({ input: number, output: roman });
});

module.exports = router;