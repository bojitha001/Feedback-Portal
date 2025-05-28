const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /signup
router.post('/signup', async (req, res) => {
  // TODO: Handle signup (create user, hash password, return JWT)
  res.status(501).json({ message: 'Not implemented. Implement signup logic.' });
});

// POST /login
router.post('/login', async (req, res) => {
  // TODO: Handle login (check user, compare password, return JWT)
  res.status(501).json({ message: 'Not implemented. Implement login logic.' });
});

module.exports = router;
