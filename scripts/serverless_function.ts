import { Hono } from "hono";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";

const app = new Hono();
const BOT_TOKEN = Bun.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = Bun.env.CHAT_ID;

app.use(
  "/*",
  cors({
    origin: ["https://photo.illiashust.com", "https://illiashust.com", "*"],
  })
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/", (c) => c.body("Hello, there!"));

app.post(
  "/telegram/send",
  rateLimiter({
    limit: 3,
    windowMs: 60 * 1000,
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
    handler: (c) => {
      const responseMessage = {
        message: "Too many requests, please try again later.",
        statusCode: 429,
      };
      return c.json(responseMessage);
    },
  }),
  async (c) => {
    const { name = "Guest", message, subject, email } = await c.req.json();
    if (!message || !subject || !email) {
      return c.json(
        { error: "Request must contain message, subject and email" },
        400
      );
    }
    if (!BOT_TOKEN || !CHAT_ID) {
      return c.json(
        { error: "Telegram bot token or chat id not configured" },
        500
      );
    }

    try {
      console.log(`New request from: ${c.req.header("cf-connecting-ip")}`);

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `New form submission!\nSubject: ${subject}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
          }),
        }
      );

      const result = await response.json();
      return c.json({ success: "Message sent successfully" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to send message" }, 500);
    }
  }
);

Bun.serve({
  port: Bun.env.PORT ?? 3000,
  fetch: app.fetch,
});
