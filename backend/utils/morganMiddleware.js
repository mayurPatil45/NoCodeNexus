const morgan = require('morgan');
const { stream } = require('./logger');

// Define a custom token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Create custom morgan middleware
const morganMiddleware = morgan(
    // Define message format string (this is the default format with body added)
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body',
    // Options: use stream from our winston logger
    { stream }
);

module.exports = morganMiddleware;