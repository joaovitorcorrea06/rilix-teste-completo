const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");

router.get("/", newsController.getActiveNews);
router.get("/edit/:id", newsController.getNewsById);
router.get("/all", newsController.getAllNews);
router.post("/", newsController.createNews);
router.put("/edit/:id", newsController.updateNews);
router.patch("/edit/:id", newsController.toggleActive);
router.delete("/edit/:id", newsController.deleteNews);
router.get("/stats", newsController.getStats);


module.exports = router;
