const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();

const collectionRoutes = require('./api/routes/collectionRoutes');
const databaseRoutes = require('./api/routes/databaseRoutes');
const documentRoutes = require('./api/routes/documentRoutes');
const fieldRoutes = require('./api/routes/fieldRoutes');
const projectRoutes = require('./api/routes/projectRoutes');
const projectUserRoutes = require('./api/routes/projectUserRoutes');
const userRoutes = require('./api/routes/userRoutes');

// const DB = process.env.DATABASE_LOCAL.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        resp.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        return resp.status(200).json({});
    }
    next();
});

app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/databases', databaseRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/projectUsers', projectUserRoutes);
app.use('/api/v1/users', userRoutes);

app.use((req, resp, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, resp, next) => {
    resp.status(error.status || 500);
    resp.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;