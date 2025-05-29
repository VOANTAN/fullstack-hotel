const express = require("express");
const router = express.Router(); // DÙNG express.Router(), KHÔNG PHẢI require("router")

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
} = require("../controllers/bookingController");

router.post("/", verifyToken, createBooking);
router.get("/user", verifyToken, getUserBookings);
router.get("/", verifyToken, isAdmin, getAllBookings);

module.exports = router;
