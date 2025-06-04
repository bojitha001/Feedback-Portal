const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const authMiddleware = require('./middleware/auth');
const adminRoutes = require('./routes/admin');
const prisma = new PrismaClient();
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/feedback', authMiddleware, feedbackRoutes);
app.use('/admin', authMiddleware, adminRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
