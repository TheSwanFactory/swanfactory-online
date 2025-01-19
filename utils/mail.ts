import Mailgun from "@schotsl/mailgun";

const mailgun = new Mailgun({
  key: Deno.env.get("MAILGUN_API_KEY") || "",
  domain: Deno.env.get("MAILGUN_DOMAIN") || "",
  region: "us", // or "eu" based on your Mailgun account
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  from: string = "info@swanfactory.online",
) {
  try {
    await mailgun.send({ to, from, subject, text });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
