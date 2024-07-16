import express from 'express';
import connectDB from '../src/utils/connectDB.js';
import urlRouter from './routes/url.route.js';
import dotenv from 'dotenv';
import path from 'path';
import staticRoute from './routes/staticRouter.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB(process.env.DB_URI);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

// Routes
app.use('/url', urlRouter);
app.use('/', staticRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
