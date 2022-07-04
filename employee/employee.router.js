const express = require("express");
// const upload = require("../middleware/multer");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const userController = require("./employee.controller");

// API for Employee register.
router.post("/signup", async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

// API for Employee login.
router.post("/login", async (req, res) => {
  const result = await userController.loginUser(req);
  return res.json(result);
});

router.get("/getUser", authenticateToken, async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

module.exports = router;
