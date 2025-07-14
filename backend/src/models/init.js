const db = require("./db");

async function initDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS news (
      id VARCHAR PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      is_active BOOLEAN DEFAULT TRUE,
      image_key TEXT NOT NULL,
      title TEXT NOT NULL,
      resume TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `);
  console.log("✅ Tabela 'news' verificada/criada");
}

module.exports = initDatabase;
