import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token
const twilioWhatsAppNumber = "whatsapp:+14155238886"; // Twilio Sandbox WhatsApp Number

const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const body = await req.json();
    const { phoneNumber, message } = body;

    if (!phoneNumber || !message) {
      return new Response(
        JSON.stringify({ message: "Phone number and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send WhatsApp message
    const response = await client.messages.create({
      from: twilioWhatsAppNumber,  // Twilio sandbox number
      to: `whatsapp:${phoneNumber}`, // User's WhatsApp number in E.164 format
      body: message,               // Message content
    });

    console.log(`WhatsApp message sent: ${response.sid}`);
    return new Response(
      JSON.stringify({ message: "WhatsApp message sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send WhatsApp message.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
