import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lifeupforall@gmail.com",
      subject: "Νέα εγγραφή στο LifeUp4All",
      html: `<p>Νέο email στη waitlist: <strong>${email}</strong></p>`,
    });

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("NOTIFY ERROR:", err);
    return res.status(500).json({
      error: "Notify failed",
      details: String(err),
    });
  }
}
