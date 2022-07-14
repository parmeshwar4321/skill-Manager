const skillsDataAccess = require("./skills.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.addSkill = async (req) => {
  const userId = req.token_data._id;

  const { skillName, level, proficiency, yearsOfExperiance, isExpert } =
    req.body;
  if (!skillName || !level || !proficiency || !yearsOfExperiance || !isExpert) {
    throw new ExpressError(401, "Bad request");
  }
  const skillData = {
    skillName: req.body.skillName,
    level: req.body.level,
    proficiency: req.body.proficiency,
    yearsOfExperiance: req.body.yearsOfExperiance,
    isExpert: req.body.isExpert,
    userId,
  };
  const lead = await skillsDataAccess.addSkill(skillData);
  if (lead) {
    addToUser = {
      userId: userId,
      skillId: lead._id,
    };
    const addedToUser = await skillsDataAccess.addSkillToUser(addToUser);
    return {
      error: false,
      sucess: true,
      message: "Get user data",
      data: lead,
    };
  }
};
exports.updateSkill = async (req) => {
  const { skillId } = req.params;
  console.log(skillId);
  const { skillName, level, proficiency, yearsOfExperiance, isExpert } =
    req.body;

  if (!skillId) {
    throw new ExpressError(401, "Bad request");
  }

  const updateSkillData = {
    skillId,
    toUpdate: req.body,
    // {
    // skillName: req.body.skillName,
    // level: req.body.level,
    // proficiency: req.body.proficiency,
    // yearsOfExperiance: req.body.yearsOfExperiance,
    // isExpert: req.body.isExpert,
    // },
  };
  console.log(updateSkillData);
  const update = await skillsDataAccess.updateSkill(updateSkillData);
  if (!update) {
    return {
      error: true,
      sucess: false,
      message: "skills not updated1",
    };
  }
  return {
    error: false,
    sucess: true,
    message: "Skills updated successfully!",
    data: update,
  };
};

exports.deleteSkill = async (req) => {
  const { skillId } = req.params;
  const userId = req.token_data._id;

  if (!skillId) {
    throw new ExpressError(401, "Bad request");
  }

  const deleted = await skillsDataAccess.deleteSkill(skillId);
  if (deleted.deletedCount > 0) {
    console.log(deleted);
    deleteToUser = {
      userId,
      skillId,
    };
    const deletedToUser = await skillsDataAccess.deleteSkillToUser(
      deleteToUser
    );
    return {
      error: false,
      sucess: true,
      message: "Skill deleted successfully!",
      data: deleted,
    };
  }
  return {
    error: true,
    sucess: false,
    message: "skill not deleted",
  };
};
