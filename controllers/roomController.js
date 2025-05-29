const Room = require("../models/Room");

// GET tất cả phòng
exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// GET chi tiết phòng
exports.getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.json(room);
};

// POST tạo phòng
exports.createRoom = async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.json(room);
};

// PUT cập nhật phòng
exports.updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(room);
};

// DELETE xoá phòng
exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Xoá thành công" });
};
