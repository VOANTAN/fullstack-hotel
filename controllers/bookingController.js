const Booking = require("../models/Booking");

// ✅ Tạo đơn đặt phòng
const createBooking = async (req, res) => {
  try {
    const { roomId, date, note } = req.body;
    const userId = req.user.id;

    const booking = new Booking({ userId, roomId, date, note });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi đặt phòng", error: err.message });
  }
};

// ✅ Lấy đơn đặt phòng của người dùng hiện tại
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "roomId",
      "name"
    );

    const result = bookings.map((b) => ({
      _id: b._id,
      room: { name: b.roomId?.name },
      date: b.date,
      note: b.note,
    }));

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy đơn đặt", error: err.message });
  }
};

// ✅ ADMIN: Lấy toàn bộ đơn đặt
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("roomId", "name");

    const result = bookings.map((b) => ({
      _id: b._id,
      user: {
        name: b.userId?.name,
        email: b.userId?.email,
      },
      room: {
        name: b.roomId?.name,
      },
      date: b.date,
      note: b.note,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi lấy toàn bộ đơn đặt phòng",
      error: err.message,
    });
  }
};

// ✅ Export các controller
module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
};
