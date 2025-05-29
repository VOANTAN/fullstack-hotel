const express = require("express");
const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", verifyToken, isAdmin, createRoom);
router.put("/:id", verifyToken, isAdmin, updateRoom);
router.delete("/:id", verifyToken, isAdmin, deleteRoom);

module.exports = router;
