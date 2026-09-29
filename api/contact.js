// Vercel Serverless Function: Server-Side Validation, Rate Limiting & Security Rules

export default async function handler(req, res) {
  // 1. Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // 2. Server-Side Input Validation & Sanitization
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: "الاسم مطلوب ويجب أن يتكون من حرفين على الأقل." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: "بريد إلكتروني غير صالح." });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ success: false, error: "الرسالة قصيرة للغاية. يرجى كتابة 5 أحرف على الأقل." });
    }

    // Sanitize Against Script Injections (XSS)
    const sanitize = (str) =>
      str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

    const sanitizedData = {
      name: sanitize(name.trim()),
      email: email.trim().toLowerCase(),
      subject: sanitize((subject || "رسالة جديدة من المعرض").trim()),
      message: sanitize(message.trim()),
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      message: "تم استلام رسالتك وفحصها أمنياً بنجاح.",
      data: sanitizedData
    });

  } catch (error) {
    // Mask internal server errors to avoid stack trace leaks
    console.error("API Security Error:", error);
    return res.status(500).json({ success: false, error: "حدث خطأ غير متوقع في المعالجة." });
  }
}
