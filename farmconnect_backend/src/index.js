require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./config/database');
const logger = require('./utils/logger');
const routes = require('./routes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (config.env === 'development') {
  app.use(morgan('dev', { 
    stream: { 
      write: message => logger.info(message.trim()) 
    } 
  }));
}

// API Routes
app.use('/api', routes);

// Serve static files in production
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  // Log the full error in development
  if (config.env === 'development') {
    console.error(err.stack);
  }
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(config.env === 'development' && { stack: err.stack })
    },
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    
    // Sync all models
    if (config.env !== 'production') {
      await sequelize.sync({ alter: true });
      logger.info('Database synchronized');
    }

    const server = app.listen(config.port, () => {
      logger.info(`Server running in ${config.env} mode on port ${config.port}`);
    });

    return server;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Start the server
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
