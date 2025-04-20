const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Enquiry = mongoose.model("Enquiry", enquirySchema);
  



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for contact form
app.post("/submit-enquiry", async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    console.log(name, email, message);

    try {
       const queries = await Enquiry.find();
       console.log(queries);
      const newEnquiry = new Enquiry({ name, email, message });
      await newEnquiry.save();
      console.log("✅ Enquiry saved to database");


      //sends email
      await transporter.sendMail({
        from: `${email}`,
        to: "srk.2k.1.01@gmail.com", // Or multiple emails
        subject: "New Contact Enquiry from Website",
        html: `<h2>New Enquiry Received</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`,
      });
      console.log("📧 Email sent & enquiry saved");


      return res.status(200).json({ message: "Enquiry submitted successfully." });
    } catch (err) {
      console.error("❌ Failed to save enquiry:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
