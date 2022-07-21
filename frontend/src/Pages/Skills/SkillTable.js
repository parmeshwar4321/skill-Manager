import Edit from "@mui/icons-material/Edit";
import CheckBox from "@mui/icons-material/CheckBox";
import IconButton from "@mui/material/IconButton";

const SkillTable = ({
  skillName,
  isExpert,
  level,
  proficiency,
  yearsOfExperiance,
}) => {
  return (
    <tr>
      <td>
        <b>{skillName}</b>
        <br></br>
        {isExpert ? (
          <div>
            <IconButton>
              <CheckBox />
            </IconButton>
            Mark this as Expert Skill
          </div>
        ) : (
          <div>
            <IconButton>
              <CheckBox style={{ color: "#F05D23" }} />
            </IconButton>
            Mark this as Expert Skill
          </div>
        )}
      </td>
      <td>
        <b>{level}</b> Level with <b>{proficiency}%</b> Proficiency <br />
        <br />
        10 Assessments
      </td>
      <td>
        Self Assessment
        <IconButton>
          <Edit />
        </IconButton>
        <br />
        <b> {yearsOfExperiance}</b> years, Expert Level with 90% proficiency
      </td>
    </tr>
  );
};

export default SkillTable;
