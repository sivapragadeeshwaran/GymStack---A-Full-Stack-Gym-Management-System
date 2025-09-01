import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axiosInstance from "../../services/axiosInstance";
import { useAuth } from "../../services/authService";
const socket = io("http://localhost:5000");

export default function MessagePage() {
  const { authUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);

  // Join socket room with consistent ID
  useEffect(() => {
    if (authUser?.user_id) {
      socket.emit("join", authUser.user_id);
    }
  }, [authUser]);

  // Fetch allowed members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axiosInstance.get("/api/messages/contacts");
        setMembers(Array.isArray(res.data.contacts) ? res.data.contacts : []);
      } catch (err) {
        console.error("Error fetching members", err);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  // Load chat history
  const loadMessages = async (userId) => {
    setSelectedUser(userId);
    // On small screens, hide sidebar when a chat is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
    try {
      const res = await axiosInstance.get(`/api/messages/chat/${userId}`);
      setMessages(Array.isArray(res.data.messages) ? res.data.messages : []);
    } catch (err) {
      console.error("Error loading messages", err);
      setMessages([]);
    }
  };

  // Real-time listener with duplicate prevention
  useEffect(() => {
    const handleMessage = (msg) => {
      // Ignore messages sent by the current user
      if (msg.sender?._id?.toString() === authUser?.user_id?.toString()) {
        return;
      }
      // Check if message belongs to current chat
      const isFromSelectedUser =
        msg.sender?._id?.toString() === selectedUser?.toString();
      const isToSelectedUser =
        msg.receiver?._id?.toString() === selectedUser?.toString();
      if (isFromSelectedUser || isToSelectedUser) {
        setMessages((prev) => {
          // Avoid duplicate messages
          const exists = prev.some((m) => m._id === msg._id);
          return exists ? prev : [...prev, msg];
        });
      } else {
      }
    };
    socket.on("receiveMessage", handleMessage);
    return () => socket.off("receiveMessage", handleMessage);
  }, [selectedUser, authUser]);

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    // Create unique temporary ID
    const tempId = `temp-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // Optimistic UI update
    const tempMessage = {
      _id: tempId,
      sender: { _id: authUser.user_id },
      receiver: { _id: selectedUser },
      content: newMessage,
      createdAt: new Date(),
      status: "pending",
    };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    try {
      const res = await axiosInstance.post("/api/messages/send", {
        receiverId: selectedUser,
        content: newMessage,
      });
      // Replace temp message with real one
      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempId ? res.data.message : msg))
      );
    } catch (err) {
      // Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      console.error("Error sending message", err);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper function to safely get timestamp
  const getMessageTimestamp = (msg) => {
    if (msg.createdAt instanceof Date) {
      return msg.createdAt.getTime();
    }
    if (typeof msg.createdAt === "string") {
      return new Date(msg.createdAt).getTime();
    }
    return Date.now(); // Fallback
  };

  // Format time for display
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get selected user details
  const getSelectedUserDetails = () => {
    return members.find((m) => m._id === selectedUser);
  };

  // Filter members based on search term
  const filteredMembers = members.filter((member) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (member.username &&
        member.username.toLowerCase().includes(searchLower)) ||
      (member.email && member.email.toLowerCase().includes(searchLower))
    );
  });

  // Handle back to chat list on small screens
  const handleBackToList = () => {
    setShowSidebar(true);
  };

  return (
    <div className="flex h-screen bg-[#141414] text-white overflow-hidden">
      {/* Sidebar Members List - Hidden on small screens when chat is selected */}
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-1/4 bg-[#303030] border-r border-[#474747] p-4 absolute md:relative inset-y-0 left-0 z-10 h-full`}
      >
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              Messages
            </h1>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 rounded-full hover:bg-[#474747]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-[#ababab] text-sm mt-1">Connect with your team</p>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-[#141414] border border-[#474747] rounded-xl py-3 px-4 pl-10 text-white placeholder-[#ababab] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 text-[#ababab]"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h2 className="text-xs uppercase text-[#ababab] font-semibold tracking-wider mb-3 px-2">
            Recent Chats
          </h2>
          <ul className="space-y-1">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((m) => (
                <li
                  key={m._id}
                  onClick={() => loadMessages(m._id)}
                  className={`p-3 cursor-pointer rounded-xl transition-all duration-200 ${
                    selectedUser === m._id
                      ? "bg-[#141414] border border-[#474747]"
                      : "hover:bg-[#141414]"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#474747] flex items-center justify-center text-white font-bold">
                      {m.username?.charAt(0).toUpperCase() ||
                        m.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="font-semibold truncate text-sm md:text-base">
                        {m.username || m.email}
                      </h3>
                      <span className="text-xs text-[#ababab] bg-[#141414] px-2 py-1 rounded-full inline-block mt-1">
                        {m.role || "Member"}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#ababab]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                {searchTerm ? (
                  <>
                    <p className="text-[#ababab]">No contacts found</p>
                    <p className="text-[#ababab] text-sm mt-1">
                      Try a different search term
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#ababab]">No contacts found</p>
                    <p className="text-[#ababab] text-sm mt-1">
                      Start a new conversation
                    </p>
                  </>
                )}
              </div>
            )}
          </ul>
        </div>

        <div className="pt-4 border-t border-[#474747] mt-2">
          <div className="flex items-center p-2 rounded-lg bg-[#141414]">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#474747] flex items-center justify-center text-white font-bold">
              {authUser?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm md:text-base">
                {authUser?.username || "User"}
              </p>
              <p className="text-xs text-[#ababab]">
                {authUser?.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window - Hidden on small screens when sidebar is shown */}
      <div
        className={`${
          showSidebar ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-3/4 bg-[#141414] h-full`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#303030] border-b border-[#474747] p-3 md:p-4 flex items-center">
              <button
                onClick={handleBackToList}
                className="md:hidden mr-3 p-2 rounded-full hover:bg-[#474747]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#474747] flex items-center justify-center text-white font-bold">
                {getSelectedUserDetails()?.username?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
              <div className="ml-3 md:ml-4">
                <h2 className="font-bold text-base md:text-lg">
                  {getSelectedUserDetails()?.username ||
                    getSelectedUserDetails()?.email}
                </h2>
                <p className="text-xs md:text-sm text-[#ababab]">
                  {getSelectedUserDetails()?.role || "Member"}
                </p>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="p-2 rounded-full hover:bg-[#474747] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-[#474747] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-[#474747] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => {
                    const isMine =
                      msg.sender?._id?.toString() ===
                      authUser?.user_id?.toString();
                    const showDate =
                      index === 0 ||
                      new Date(msg.createdAt).toDateString() !==
                        new Date(messages[index - 1].createdAt).toDateString();
                    return (
                      <div key={msg._id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs bg-[#303030] text-[#ababab] px-3 py-1 rounded-full">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isMine ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] md:max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                              isMine
                                ? "bg-[#474747] rounded-br-none"
                                : "bg-[#303030] border border-[#474747] rounded-bl-none"
                            }`}
                          >
                            <p className="text-white text-sm md:text-base">
                              {msg.content}
                            </p>
                            <div
                              className={`flex justify-end mt-1 text-xs ${
                                isMine ? "text-[#ababab]" : "text-[#ababab]"
                              }`}
                            >
                              {formatTime(msg.createdAt)}
                              {isMine && (
                                <span className="ml-1">
                                  {msg.status === "pending" ? "⏳" : "✓✓"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#303030] flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 md:h-12 md:w-12 text-[#ababab]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3, 13.574 3, 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    No messages yet
                  </h3>
                  <p className="text-[#ababab] max-w-md text-sm md:text-base">
                    Start a conversation with{" "}
                    {getSelectedUserDetails()?.username || "this user"}. Your
                    messages will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-[#303030] border-t border-[#474747]">
              <div className="flex items-end">
                <button className="p-2 rounded-full hover:bg-[#474747] transition-colors mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-[#ababab]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <div className="flex-1 bg-[#141414] rounded-2xl border border-[#474747] px-4 py-2 mr-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none resize-none text-white placeholder-[#ababab] max-h-32 py-2 text-sm md:text-base"
                    placeholder="Type a message..."
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 md:p-3 rounded-full ${
                    newMessage.trim()
                      ? "bg-[#474747] hover:bg-[#5a5a5a]"
                      : "bg-[#474747] cursor-not-allowed"
                  } transition-all duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#303030] flex items-center justify-center mb-6 md:mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 md:h-16 md:w-16 text-[#ababab]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Welcome to Messages
            </h2>
            <p className="text-[#ababab] max-w-lg mb-6 md:mb-8 text-sm md:text-base">
              Select a conversation from the list to start messaging or search
              for someone to chat with.
            </p>
            <button
              onClick={() => setShowSidebar(true)}
              className="px-6 py-3 bg-[#303030] border border-[#474747] rounded-full font-medium hover:bg-[#474747] transition-all duration-300"
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
