const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
// const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/feedback', async (req, res) => {
  // TODO: Fetch all feedback (admin only)
  res.status(501).json({ message: 'Not implemented. Implement admin feedback logic.' });
});

module.exports = router;
