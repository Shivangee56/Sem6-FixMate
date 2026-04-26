const express = require("express");
const { grokChatController } = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", grokChatController);

module.exports = router;