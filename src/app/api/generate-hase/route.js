import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON request body
    const { userId } = body; // Get userId from request

    const secret = process.env.CHATBASE_SECRET_KEY; // Store secret in .env.local

    if (!secret || !userId) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Generate the hash
    const hash = crypto.createHmac("sha256", secret).update(userId).digest("hex");

    return NextResponse.json({ hash });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
