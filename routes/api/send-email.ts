import { Handlers } from "$fresh/server.ts";
import { sendEmail } from "../../utils/mail.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const { to, subject, text } = await req.json();
      await sendEmail(to, subject, text);
      return new Response("Email sent successfully", { status: 200 });
    } catch (error) {
      console.error("Error in send-email API:", error);
      return new Response("Failed to send email", { status: 500 });
    }
  },
};
