const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/"(.*?)"/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handleJWTError = () =>
    new AppError('Invalid token.  Please log in again.', 401);

const handleJWTExpiredError = () =>
    new AppError('Expired token.  Please log in again.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        messsage: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            messsage: err.message
        });

        // Programming or other unkown error: don't leak error details
    } else {
        // Log error
        console.error('ERROR', err);

        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let errCopy = { ...err };

        if (errCopy.name === 'CastError') errCopy = handleCastErrorDB(errCopy);
        if (errCopy.code === 11000) errCopy = handleDuplicateFieldsDB(errCopy);
        if (errCopy.name === 'ValidationError') errCopy = handleValidationErrorDB(errCopy);
        if (errCopy.name === 'JsonWebTokenError') errCopy = handleJWTError();
        if (errCopy.name === 'TokenExpiredError') errCopy = handleJWTExpiredError();

        sendErrorProd(errCopy, res);
    }
};