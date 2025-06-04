const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createToken = (userId, email, isAdmin) => {
  return jwt.sign(
    {
      userId,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

// POST /signup
router.post("/signup", async (req, res) => {
  // TODO: Handle signup (create user, hash password, return JWT)
  const { email, password, isAdmin } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        isAdmin,
      },
      select: {
        id: true,
        email: true,
        isAdmin: true,
      },
    });

    const token = createToken(user.id, user.email, user.isAdmin);

    res.status(201).json({
      user,
      token,
    });
    console.log(user, token);
  } catch (error) {
    console.log("Register error", error);
    res.status(400).send("User not created");
  }
});

// POST /login
router.post("/login", async (req, res) => {
  // TODO: Handle login (check user, compare password, return JWT)
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }

    const isValidpassword = await bcrypt.compare(password, user.password);

    if (!isValidpassword) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = createToken(user.id, user.email, user.isAdmin);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });

    console.log(user, token);
  } catch (error) {
    console.log("Login error", error);
    res.status(400).send("User not found");
  }
});

module.exports = router;
