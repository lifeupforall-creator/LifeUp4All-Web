import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lifeupforall@gmail.com",
      subject: "🔥 Νέα εγγραφή στο LifeUp4All",
      html: `<p>Νέο email στη waitlist: <strong>${email}</strong></p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
