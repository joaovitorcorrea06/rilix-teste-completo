require("dotenv").config();
const app = require("./app");
const initDatabase = require("./models/init");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await initDatabase(); // Garante criação da tabela 'news'
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor:", error);
    process.exit(1);
  }
})();
