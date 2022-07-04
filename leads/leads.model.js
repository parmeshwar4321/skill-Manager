const mongoose = require("mongoose");
const schema = mongoose.Schema;
const leadsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  interestedCourse: {
    type: String,
  },
  isClaimed: {
    type: Boolean,
    default: false,
  },
  claimedUser: {
    type: schema.Types.ObjectId,
    ref: "employee",
  },
});

const Leads = mongoose.model("Leads", leadsSchema);
module.exports = Leads;
