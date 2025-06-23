import { NextResponse } from "next/server";
import { sendEmail } from "../../utils/emailSender";

export async function POST(req: Request) {
  try {
    // Extract data from the request body
    const { name, email, message } = await req.json();

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Construct the HTML content of the email
    const emailHtml = `
      <h2>Logos Hardware New Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;



    // Send the email
    const response = await sendEmail(process.env.TO_EMAIL as string, "New Contact Form Message", emailHtml);

    // If email sending failed
    if (!response.success) {
      throw new Error(response.error);
    }

    // Success response
    return NextResponse.json({ success: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: `Failed to send message: ${error.message}` }, { status: 500 });
  }
}
