// controllers/contactController.js
const Contact = require("../Models/contact"); // Mongoose model, coming up


const submitContactForm =async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject) {
    return res.status(400).json({ success: false, message: "Please fill all required fields." });
  }

  const contact = new Contact({ name, email, subject, message });
  await contact.save();

  res.status(201).json({ success: true, message: "Message received. We will get back to you shortly." }); }



module.exports = {submitContactForm};