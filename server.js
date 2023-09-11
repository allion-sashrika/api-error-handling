require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.get('/trigger-error', (req, res, next) => {
    try {
        console.log(someUndefinedVariable);
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error('Error from route :', err.message);
    res.status(500).json({ message: err.message });
})

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server Started'))