const mongoose = require("mongoose");
const schema = mongoose.Schema;
const leadsSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Advanced", "Expert", "Master", "Star"],
    },
    proficiency: {
      type: Number,
    },
    yearsOfExperiance: {
      type: Number,
    },
    isExpert: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Skills = mongoose.model("skills", leadsSchema);
module.exports = Skills;
