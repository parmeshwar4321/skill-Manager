const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const skillsController = require("./skills.controller");

router.get("/getAllSkills", async (request, response) => {
  const result = await skillsController.getSkills(request);
  return response.json(result);
});

// Public form API must be accessible without any authentication.
router.post("/addSkills", authenticateToken, async (request, response) => {
  const result = await skillsController.addSkill(request);
  return response.json(result);
});

// API to claim leads.
router.put("/updateSKills/:skillId", authenticateToken, async (req, res) => {
  const result = await skillsController.updateSkill(req);
  return res.json(result);
});
router.delete("/deleteSKills/:skillId", authenticateToken, async (req, res) => {
  const result = await skillsController.deleteSkill(req);
  return res.json(result);
});

module.exports = router;
