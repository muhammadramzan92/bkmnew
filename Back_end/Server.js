// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
// const cors = require("cors");
// const path  = require('path')

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Replace the following values with your GoDaddy email settings
// const EMAIL_HOST = "smtpout.secureserver.net";
// const EMAIL_PORT = 465;
// const EMAIL_USER = "info@bkmcommunity.co.uk";
// const EMAIL_PASSWORD = "Zenab_Hussain@789";

// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: EMAIL_HOST,
//     port: EMAIL_PORT,
//     auth: {
//       user: EMAIL_USER,
//       pass: EMAIL_PASSWORD,
//     },
//   })
// );

// app.post("/api/send-email", async (req, res) => {
//   try {
//     const { name, email, phone, details } = req.body;

//     const mailOptions = {
//       from: "info@bkmcommunity.co.uk",
//       to: "info@bkmcommunity.co.uk",
//       subject: "Contact Form Submission",
//       html: `
//       <h3>Contact Form Submission</h3>
//       <table>
//         <tr>
//           <th>Name</th>
//           <td>${name}</td>
//         </tr>
//         <tr>
//           <th>Email</th>
//           <td>${email}</td>
//         </tr>
//         <tr>
//           <th>Phone</th>
//           <td>${phone}</td>
//         </tr>
//         <tr>
//           <th>Details</th>
//           <td>${details}</td>
//         </tr>
//       </table>
//     `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Failed to send email." });
//   }
// });

// const port = 5000; // Replace with your desired port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// for production build
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
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
