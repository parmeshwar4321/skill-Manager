const skills = require("./skills.model");
const user = require("../user/user.model");
require("../utils/jwt");

const addSkill = async (skillsToStore) => {
  console.log(skillsToStore);
  const storedskill = await skills.create(skillsToStore);
  return storedskill;
};
const addSkillToUser = async (skillData) => {
  const storedskill = await user.updateOne(
    { _id: skillData.userId },
    { $push: { skills: skillData.skillId } }
  );
  return storedskill;
};
const deleteSkillToUser = async (skillData) => {
  const storedskill = await user.updateOne(
    { _id: skillData.userId },
    { $pull: { skills: skillData.skillId } }
  );
  return storedskill;
};

const updateSkill = async (updateSkillData) => {
  const skill = await skills.findOneAndUpdate(
    { _id: updateSkillData.skillId },
    { $set: updateSkillData.toUpdate },
    { new: true }
  );
  return skill;
};
const deleteSkill = async (skillId) => {
  const skill = await skills.deleteOne({ _id: skillId });
  return skill;
};

module.exports = {
  addSkill,
  addSkillToUser,
  updateSkill,
  deleteSkill,
  deleteSkillToUser,
};
