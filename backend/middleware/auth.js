require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

module.exports = async function (req, res, next) {
  // TODO: Extract and verify JWT token
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    const checkingUser = await prisma.user.findUnique({
      where: { id: decodedInfo.userId },
      select: {
        id: true,
        email: true,
        isAdmin: true,
      },
    });

    if (!checkingUser) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    req.user = checkingUser;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
