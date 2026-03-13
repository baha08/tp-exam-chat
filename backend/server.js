const express = require("express");
const cors    = require("cors");
const app     = express();
const PORT    = process.env.PORT || 3000;

// ── MIDDLEWARE CORS (même config que TP1/TP2) ──────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:*',
    'http://backend'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ── STOCKAGE EN MÉMOIRE (pas de base de données — comme demandé) ───────────
let messages = [];

// ── ROUTE PRINCIPALE (testée par le CI avec curl -f comme dans le TP CI) ───
app.get("/api", (req, res) => {
  res.json({
    message: "Chat Backend OK",
    timestamp: new Date().toISOString(),
    success: true
  });
});

// ── ROUTES CHAT ────────────────────────────────────────────────────────────
// GET /api/messages → retourne tous les messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// POST /api/messages → ajoute un message { author, content }
app.post("/api/messages", (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: "author et content sont requis" });
  }
  const msg = {
    author,
    content,
    time: new Date().toLocaleTimeString()
  };
  messages.push(msg);
  res.status(201).json(msg);
});

// ── DÉMARRAGE (comme dans les TPs) ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint : http://localhost:${PORT}/api`);
  console.log(`Messages    : http://localhost:${PORT}/api/messages`);
});
