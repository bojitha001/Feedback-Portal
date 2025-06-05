const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
// const authMiddleware = require('../middleware/auth');
const adminMiddelware = require("../middleware/admin");

const prisma = new PrismaClient();

router.get("/feedback", adminMiddelware, async (req, res) => {
  // TODO: Fetch all feedback (admin only)
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error fetching admin feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
