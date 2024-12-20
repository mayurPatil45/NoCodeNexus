const winston = require('winston');
const path = require('path');

// Define custom log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// Define colors for each log level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

// Tell winston about our colors
winston.addColors(colors);

// Custom format for logging
const format = winston.format.combine(
    // Add timestamp
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Add error stack trace
    winston.format.errors({ stack: true }),
    // Add colorization
    winston.format.colorize({ all: true }),
    // Custom print format
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
    )
);

// Define which transports the logger must use
const transports = [
    // Console transport for development
    new winston.transports.Console({
        format: format
    }),
    // File transport for errors
    new winston.transports.File({
        filename: path.join('logs', 'error.log'),
        level: 'error',
        format: winston.format.combine(
            winston.format.uncolorize(),
            format
        )
    }),
    // File transport for all logs
    new winston.transports.File({
        filename: path.join('logs', 'combined.log'),
        format: winston.format.combine(
            winston.format.uncolorize(),
            format
        )
    })
];

// Create the logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    levels,
    format,
    transports,
    // Don't exit on handled exceptions
    exitOnError: false
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Create a stream object with a 'write' function that will be used by Morgan
const stream = {
    write: (message) => logger.http(message.trim())
};

module.exports = {
    logger,
    stream
};