const express = require('express');
const pool = require('./config/db');

const app = express();

app.use(express.json());

const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

const suppliersRoutes = require('./routes/suppliers');
app.use('/suppliers', suppliersRoutes);

const salesRoutes = require('./routes/sales');
app.use('/sales', salesRoutes);

const modificationsRoutes = require('./routes/modifications');
app.use('/modifications', modificationsRoutes);

const reportsRoutes = require('./routes/reports');
app.use('/reports', reportsRoutes);

pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(error => {
        console.log('Database connection failed:', error);
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});