const Message = require("../Models/message-model");
const User = require("../Models/user-model");
const Trainer = require("../Models/trainer-model");
const { getIO } = require("../utils/messageSocket");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.userId; // FIXED: Changed from user_id to userId

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    // Save message
    let message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    message = await message.populate("sender", "username email role");
    message = await message.populate("receiver", "username email role");

    // Get socket instance and emit to both users
    const io = getIO();

    // CRITICAL FIX: Convert IDs to strings for consistent room matching
    const senderRoom = senderId.toString();
    const receiverRoom = receiverId.toString();

    // Emit to both sender and receiver
    io.to(senderRoom).emit("receiveMessage", message);
    io.to(receiverRoom).emit("receiveMessage", message);

    res.status(201).json({ success: true, message });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch chat between 2 users
exports.getChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.userId; // FIXED: Changed from user_id to userId

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username email role")
      .populate("receiver", "username email role");

    res.json({ success: true, messages });
  } catch (err) {
    console.error("Get chat error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Allowed contacts
exports.getAllowedContacts = async (req, res) => {
  try {
    const currentUserId = req.user.userId; // FIXED: Changed from user_id to userId
    const currentUser = await User.findById(currentUserId);

    // Add null check for currentUser
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let contacts = [];

    if (currentUser.role === "admin") {
      contacts = await User.find({ role: { $in: ["trainer", "user"] } }).select(
        "username email role"
      );
    } else if (currentUser.role === "trainer") {
      const admins = await User.find({ role: "admin" }).select(
        "username email role"
      );
      const trainerDoc = await Trainer.findOne({
        userId: currentUserId,
      }).populate("assignedMembers", "username email role");
      contacts = [...admins, ...(trainerDoc ? trainerDoc.assignedMembers : [])];
    } else if (currentUser.role === "user") {
      const admins = await User.find({ role: "admin" }).select(
        "username email role"
      );
      const trainerDoc = await Trainer.findOne({
        assignedMembers: currentUserId,
      }).populate("userId", "username email role");
      const trainerContact = trainerDoc ? [trainerDoc.userId] : [];
      contacts = [...admins, ...trainerContact];
    }

    res.json({ success: true, contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: error.message });
  }
};
