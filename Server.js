
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
  origin: 'http://www.bkmcommunity.co.uk', // Update with your frontend domain
  credentials: true, // Allow cookies and headers
};

app.use(cors(corsOptions)); // Use cors middleware with options


// Replace the following values with your GoDaddy email settings
const EMAIL_HOST = "smtpout.secureserver.net";
const EMAIL_PORT = 465;
const EMAIL_USER = "info@bkmcommunity.co.uk";
const EMAIL_PASSWORD = "Zenab_Hussain@789";

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })
);

// Serve static files from the build directory
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Handle API requests
app.post("/api/send-email", async (req, res) => {
  try {
    // Your email sending logic here
    const formData = req.body;

    // Create the email content using form data
    const emailContent = `
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Message: ${formData.details}</p>
    `;

    // Send the email
    const mailOptions = {
      from: EMAIL_USER,
      to: "info@bkmcommunity.co.uk", // Replace with the actual recipient email address
      subject: "Contact Form Submission",
      html: emailContent,
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});
// ...
app.post("/send-email-matrimonial", async (req, res) => {
  try {
    const formData = req.body;

    // Create an HTML table from the formData
    const htmlTable = `
      <table style="border-collapse: collapse; border: 1px solid black;">
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Field</th>
          <th style="border: 1px solid black; padding: 8px;">Value</th>
        </tr>
        ${Object.entries(formData)
          .map(([field, value]) => `
            <tr>
              <td style="border: 1px solid black; padding: 8px;">${field}</td>
              <td style="border: 1px solid black; padding: 8px;">${value}</td>
            </tr>
          `)
          .join("")}
      </table>
    `;

    // Email content with the HTML table
    const emailContent = `
      <p>You have received a new matrimonial registration:</p>
      ${htmlTable}
    `;

    // Send the email
    const mailOptions = {
      from: EMAIL_USER,
      to: "info@bkmcommunity.co.uk", // Replace with the actual recipient email address
      subject: "New Matrimonial Registration",
      html: emailContent,
    };
    transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Matrimonial form email sent successfully!" });
  } catch (error) {
    console.error("Error sending matrimonial form email:", error);
    res.status(500).json({ message: "Failed to send matrimonial form email." });
  }
});

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = 5000; // Replace with your desired port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
