const { Server } = require("socket.io");
let io;
function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Join user to their own room
    socket.on("join", (userId) => {
      const roomId = userId.toString();
      socket.join(roomId);
    });

    // Handle sending messages
    socket.on("sendMessage", (message) => {
      // Convert IDs to strings for consistent room matching
      const senderRoom = message.sender.toString();
      const receiverRoom = message.receiver.toString();

      // Only emit to receiver (not sender) to prevent duplicates
      io.to(receiverRoom).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {});
  });
}
function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
module.exports = { setupSocket, getIO };
