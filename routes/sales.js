const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    try {
        const { ProductID, QuantitySold, SaleDate } = req.body;

        const [result] = await pool.query(
            'INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)',
            [ProductID, QuantitySold, SaleDate]
        );

        res.status(201).json({
            message: 'Sale recorded successfully',
            SaleID: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [sales] = await pool.query(
            'SELECT * FROM Sales'
        );

        res.json(sales);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const [sales] = await pool.query(
            'SELECT * FROM Sales WHERE ProductID = ?',
            [req.params.id]
        );

        res.json(sales);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;