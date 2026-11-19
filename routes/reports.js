
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/total-sold', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT Products.ProductID,
                   Products.ProductName,
                   COALESCE(SUM(Sales.QuantitySold), 0) AS TotalQuantitySold
            FROM Products
            LEFT JOIN Sales
            ON Products.ProductID = Sales.ProductID
            GROUP BY Products.ProductID, Products.ProductName
        `);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/highest-stock', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM Products
            ORDER BY StockQuantity DESC
            LIMIT 1
        `);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/suppliers-start-f', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM Suppliers
            WHERE SupplierName LIKE 'F%'
        `);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/never-sold', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM Products
            WHERE ProductID NOT IN (
                SELECT ProductID FROM Sales
            )
        `);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sales-details', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT Products.ProductName,
                   Sales.QuantitySold,
                   Sales.SaleDate
            FROM Sales
            INNER JOIN Products
            ON Sales.ProductID = Products.ProductID
        `);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
