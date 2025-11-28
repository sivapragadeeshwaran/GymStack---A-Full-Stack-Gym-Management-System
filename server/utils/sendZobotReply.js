module.exports = function sendZobotReply(res, text, buttons = null) {
  const reply = {
    action: "reply",
    replies: [{ text }],
  };

  if (buttons) reply.suggestions = buttons;

  res.json(reply);
};
