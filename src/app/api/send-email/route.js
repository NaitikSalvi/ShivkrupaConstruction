import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server'; // Import NextResponse

export async function POST(req) {
  try {
    // Extract data from request body
    const { name, email, message } = await req.json();

    // Set up the transporter using your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this if using a different email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    // Setup email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // From your email
      to: process.env.RECIPIENT_EMAIL, // Recipient email address
      subject: `New Enquiry from ${name}`, // Subject
      html: `<h2>Enquiry Details:</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>`, // HTML content for the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success using NextResponse
    return NextResponse.json({
      success: true,
      message: 'Enquiry email sent successfully!',
    });
  } catch (error) {
    // Log and respond with error if sending email fails
    console.error('Error sending email:', error);

    // Return error response using NextResponse
    return NextResponse.json(
      { success: false, message: 'Failed to send enquiry email.' },
      { status: 500 }
    );
  }
}
