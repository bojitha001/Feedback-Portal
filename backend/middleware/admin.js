const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (!req.user.isAdmin) {
      return res.status(401).json({
        error: "Access denied. Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ error: "Server error in admin middleware" });
  }
};
