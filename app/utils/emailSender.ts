import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",  // Or use another SMTP service
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,  // Your Gmail address (or other email service)
        pass: process.env.GMAIL_PASS,  // Your Gmail password or App Password
      },
      tls: {
        rejectUnauthorized: false,  // Disable certificate validation (not recommended for production)
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,  // Sender address
      to,                            // Receiver address
      subject,                       // Subject line
      html,                          // HTML body content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
};
