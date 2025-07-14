const db = require("../models/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  // GET /news (ativas)
  getActiveNews: async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM news WHERE is_active = true ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar notícias ativas" });
    }
  },

  // GET /news/all?search=palavra
  // GET /news/all?search=palavra
  // GET /news/all (com filtro por texto)
  getAllNews: async (req, res) => {
    const { status, search } = req.query;

    let query = "SELECT * FROM news";
    const values = [];
    const conditions = [];

    if (status === "active") {
      conditions.push("is_active = true");
    }

    if (search) {
      conditions.push(`(title ILIKE $${values.length + 1} OR resume ILIKE $${values.length + 1} OR description ILIKE $${values.length + 1})`);
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    try {
      const result = await db.query(query, values);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar notícias" });
    }
  },


  // POST /news
  createNews: async (req, res) => {
    const { title, image_key, resume, description } = req.body;

    if (!title || !image_key || !resume || !description) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const id = uuidv4();
      const result = await db.query(
        `INSERT INTO news (id, created_at, is_active, image_key, title, resume, description)
         VALUES ($1, NOW(), true, $2, $3, $4, $5) RETURNING *`,
        [id, image_key, title, resume, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar notícia" });
    }
  },

  // PUT /news/:id
  updateNews: async (req, res) => {
    const { id } = req.params;
    const { title, image_key, resume, description } = req.body;

    if (!title || !image_key || !resume || !description) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const result = await db.query(
        `UPDATE news
       SET title = $1, image_key = $2, resume = $3, description = $4
       WHERE id = $5 RETURNING *`,
        [title, image_key, resume, description, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar notícia" });
    }
  },

  // PATCH /news/:id (ativar/inativar)
  toggleActive: async (req, res) => {
    const { id } = req.params;

    try {
      const current = await db.query("SELECT is_active FROM news WHERE id = $1", [id]);
      const is_active = current.rows[0]?.is_active;

      const result = await db.query(
        `UPDATE news SET is_active = $1 WHERE id = $2 RETURNING *`,
        [!is_active, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erro ao alternar status da notícia" });
    }
  },

  // DELETE /news/:id
  deleteNews: async (req, res) => {
    const { id } = req.params;

    try {
      await db.query("DELETE FROM news WHERE id = $1", [id]);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar notícia" });
    }
  },

  // GET /news/:id
  getNewsById: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await db.query("SELECT * FROM news WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Notícia não encontrada" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar notícia por ID" });
    }
  },

  // GET /news/stats
  getStats: async (req, res) => {
    try {
      const total = await db.query("SELECT COUNT(*) FROM news");
      const active = await db.query("SELECT COUNT(*) FROM news WHERE is_active = true");
      const inactive = await db.query("SELECT COUNT(*) FROM news WHERE is_active = false");

      res.json({
        total: parseInt(total.rows[0].count),
        active: parseInt(active.rows[0].count),
        inactive: parseInt(inactive.rows[0].count),
      });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar estatísticas" });
    }
  }


};
