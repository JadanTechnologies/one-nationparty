import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  app.use(express.json());

  // API Routes
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, fullName } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping email sending.");
      return res.json({ success: true, message: "Email skipped (no API key)" });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "OneNation Party <onboarding@resend.dev>",
        to: [email],
        subject: "Confirm Your OneNation Party Registration",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h1 style="color: #058541;">Welcome to OneNation Party!</h1>
            <p>Hello ${fullName},</p>
            <p>Thank you for registering with OneNation Party. We are excited to have you join our movement for a better Nigeria.</p>
            <p>Please click the button below to confirm your email and activate your membership:</p>
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/confirm-email?email=${encodeURIComponent(email)}" 
               style="display: inline-block; background-color: #058541; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
              Confirm Email Address
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              If you did not initiate this registration, please ignore this email.
            </p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 10px; color: #999;">
              Developed By Jadan Tech Solution Nigeria Ltd
            </p>
          </div>
        `,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
