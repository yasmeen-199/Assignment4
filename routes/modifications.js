const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/add-category', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products ADD Category VARCHAR(100)'
        );

        res.json({ message: 'Category column added successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/remove-category', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products DROP COLUMN Category'
        );

        res.json({ message: 'Category column removed successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/contact-number', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)'
        );

        res.json({ message: 'ContactNumber changed successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/product-name', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL'
        );

        res.json({ message: 'ProductName is now NOT NULL' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;