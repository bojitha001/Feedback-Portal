const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /feedback
router.get("/", async (req, res) => {
  // TODO: Return feedback for logged in user
  res
    .status(501)
    .json({ message: "Not implemented. Implement get feedback logic." });
});

// POST /feedback
router.post("/", async (req, res) => {
  // TODO: Save new feedback for user
  const userId = req.user?.id;
  const { message } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Message is required and must be a string" });
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        message,
        user: {
          connect: { id: userId },
        },
      },
    });

    return res.status(201).json({ success: true, feedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
