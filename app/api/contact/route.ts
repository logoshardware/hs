import { NextResponse } from "next/server";
import { sendEmail } from "../../utils/emailSender";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailHtml = `
      <h2>Logos Hardware New Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const response = await sendEmail(process.env.TO_EMAIL as string, "New Contact Form Message", emailHtml);

    if (!response.success) {
      throw new Error(response.error);
    }

    return NextResponse.json({ success: "Message sent successfully!" }, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: `Failed to send message: ${errorMessage}` }, { status: 500 });
  }
}
