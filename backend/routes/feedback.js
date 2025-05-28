const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /feedback
router.get('/', async (req, res) => {
  // TODO: Return feedback for logged in user
  res.status(501).json({ message: 'Not implemented. Implement get feedback logic.' });
});

// POST /feedback
router.post('/', async (req, res) => {
  // TODO: Save new feedback for user
  res.status(501).json({ message: 'Not implemented. Implement post feedback logic.' });
});

module.exports = router;
