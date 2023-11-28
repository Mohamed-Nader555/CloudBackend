const express = require('express');
const dotenv = require('dotenv');


const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const initiateDBConnection = require('./config/db');
dotenv.config({
    path: './config/.env'
});

const PORT = process.env.PORT
const app = express()
app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)

    await initiateDBConnection();
});