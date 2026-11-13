// Vercel Serverless Function: AI đọc ảnh menu bằng Claude API
// Cần biến môi trường ANTHROPIC_API_KEY (Vercel → Project → Settings → Environment Variables)
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const MAX_IMAGES = 5;
const MAX_B64 = 1_500_000; // ~1.1MB mỗi ảnh (app đã nén ~<300KB)

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(501).json({ error: "Chưa cấu hình ANTHROPIC_API_KEY" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const prompt = String(body.prompt || "").slice(0, 4000);
    const images = Array.isArray(body.images) ? body.images.slice(0, MAX_IMAGES) : [];
    if (!prompt || !images.length) return res.status(400).json({ error: "Thiếu ảnh hoặc prompt" });
    const okTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const content = [];
    for (const im of images) {
      const mt = okTypes.includes(im.media_type) ? im.media_type : "image/jpeg";
      const data = String(im.data || "");
      if (!data || data.length > MAX_B64) return res.status(400).json({ error: "Ảnh quá lớn" });
      content.push({ type: "image", source: { type: "base64", media_type: mt, data } });
    }
    content.push({ type: "text", text: prompt });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 8000, messages: [{ role: "user", content }] }),
    });
    const j = await r.json();
    if (!r.ok) return res.status(r.status === 429 ? 429 : 502).json({ error: (j.error && j.error.message) || "Claude API lỗi" });
    const text = (j.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
};
