import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "legendcod172@resend.dev",
      to: ["legendcod172@gmail.com"],
      subject: "Hello world",
      react: <EmailTemplate firstName={body.name || "User"} />, // ✅ JSX
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Route crashed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
