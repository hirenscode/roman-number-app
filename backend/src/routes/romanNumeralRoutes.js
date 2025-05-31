const express = require('express');
const { toRoman } = require('../services/RomanCalcService');
const { logger, metrics } = require('../observability');

const router = express.Router();

router.get('/', (req, res) => {
    const numberFromQuery = req.query.number;
    if (!numberFromQuery) {
        logger.warn('Missing number parameter', { query: req.query });
        metrics.romanConversionCounter.inc({ status: 'error' });
        return res.status(400).json({ error: 'Missing query parameter: number' });
    }

    const number = parseInt(numberFromQuery, 10);

    if (isNaN(number)) {
        logger.warn('Invalid number parameter', { input: numberFromQuery });
        metrics.romanConversionCounter.inc({ status: 'error' });
        return res.status(400).json({ error: 'Query parameter "number" must be a number' });
    }

    try {
        const roman = toRoman(number);
        logger.info('Roman numeral conversion successful', { input: number, output: roman });
        metrics.romanConversionCounter.inc({ status: 'success' });
        res.json({ input: number, output: roman });
    } catch (error) {
        logger.error('Roman numeral conversion failed', { 
            input: number, 
            error: error.message 
        });
        metrics.romanConversionCounter.inc({ status: 'error' });
        res.status(400).json({ error: 'Failed to convert number to Roman numeral' });
    }
});

module.exports = router;