const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/main");
const authControllers = require("../controllers/auth");
const postsControllers = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", mainControllers.getIndex);

router.get("/profile", ensureAuth, postsControllers.getProfile);
router.get("/feed", ensureAuth, postsControllers.getFeed);
router.get("/communityBoard", ensureAuth, postsControllers.getCommunityBoard)

router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);
router.get("/signup", authControllers.getSignup);
router.post("/signup", authControllers.postSignup);

module.exports = router;
