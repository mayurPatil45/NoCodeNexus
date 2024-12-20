require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { logger } = require('./utils/logger');
const morganMiddleware = require('./utils/morganMiddleware');

const authRoutes = require('./routes/authRoutes'); // Fixed path name
const { authenticateToken } = require('./middlewares/authMiddleware'); // Moved to separate middleware file

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Exact origin of your Vite frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

// Middleware
app.use(helmet()); // Helps secure Express apps by setting various HTTP headers
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morganMiddleware); // HTTP request logging

// Routes
app.use('/api/auth', authRoutes); // Changed to use router properly

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
    });
});
