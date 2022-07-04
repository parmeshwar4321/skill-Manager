const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const leadsController = require("../leads/leads.controller");

// Public form API must be accessible without any authentication.
router.post("/form", async (request, response) => {
  const result = await leadsController.createForm(request);
  return response.json(result);
});

// API to claim leads.
router.put("/claim/:leadId", authenticateToken, async (req, res) => {
  const result = await leadsController.claimLead(req);
  return res.json(result);
});

// API to fetch unclaimed leads.
router.get(
  "/getUnClaimedLeads",
  async (request, response) => {
    const result = await leadsController.getUnclaimedLeads(request);
    return response.json(result);
  }
);

// API to fetch leads claimed by logged in users.
router.get(
  "/getClaimedLeadsByEmployee",
  authenticateToken,
  async (request, response) => {
    const result = await leadsController.getClaimedLeadsByEmployee(request);
    return response.json(result);
  }
);

router.get("/getAllLeads", authenticateToken, async (request, response) => {
  const result = await leadsController.getAllLeads(request);
  return response.json(result);
});

module.exports = router;
