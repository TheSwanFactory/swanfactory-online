import Mailgun from "@schotsl/mailgun";

const apiKey = Deno.env.get("MAILGUN_API_KEY");
const domain = Deno.env.get("MAILGUN_DOMAIN");

if (!apiKey || !domain) {
  throw new Error(
    "MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables must be set",
  );
}

const mailgun = new Mailgun({
  key: apiKey,
  domain: domain,
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
