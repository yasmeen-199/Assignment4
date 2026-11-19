
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            [ProductName, Price, StockQuantity, SupplierID]
        );

        res.status(201).json({
            message: 'Product created successfully',
            ProductID: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/insert-data', async (req, res) => {
    try {
        const [supplier] = await pool.query(
            'INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)',
            ['FreshFoods', '01001234567']
        );

        const supplierID = supplier.insertId;

        await pool.query(
            `INSERT INTO Products
            (ProductName, Price, StockQuantity, SupplierID)
            VALUES
            ('Milk', 15.00, 50, ?),
            ('Bread', 10.00, 30, ?),
            ('Eggs', 20.00, 40, ?)`,
            [supplierID, supplierID, supplierID]
        );

        res.json({ message: 'Initial data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update-bread-price', async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE Products SET Price = 25.00 WHERE ProductName = ?',
            ['Bread']
        );

        res.json({
            message: 'Bread price updated successfully',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete-eggs', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Products WHERE ProductName = ?',
            ['Eggs']
        );

        res.json({
            message: 'Eggs deleted successfully',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM Products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [products] = await pool.query(
            'SELECT * FROM Products WHERE ProductID = ?',
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(products[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            'UPDATE Products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?',
            [ProductName, Price, StockQuantity, SupplierID, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Products WHERE ProductID = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
