import Delete from "@mui/icons-material/Delete";
import CheckBox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Slider from "@mui/material/Slider";
import "./manage.css";
import Box from "@mui/material/Box";

const styles = {
  btn: {
    fontSize: "16px",
    "margin-right": "8px",
    width: "25px",
    height: "25px",
    bacground: "#fff",
    border: "none",
    borderRadius: "4px",
    background: "#fff",
  },
};
const SkillTable = ({
  key,
  skillName,
  isExpert,
  level,
  proficiency,
  yearsOfExperiance,
}) => {
  const roleArray = ["Beginner", "Advanced", "Expert", "Master", "Star"];

  return (
    <>
      <tr>
        <div>
          <td>
            <IconButton>
              <Delete />
            </IconButton>

            <b>{skillName}</b>
          </td>
          <td>
            <div>
              <IconButton>
                <CheckBox
                  style={{ color: "#F05D23" }}
                  checked={isExpert}
                  onChange={(e) => e.target.value}
                />
              </IconButton>
              Mark this as Expert Skill
            </div>
          </td>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: "30px", paddingLeft: "10px" }}>
            <header>Select your Level</header>

            {roleArray.map((role, index) => {
              if (role === level) {
                return (
                  <span
                    style={{
                      padding: "10px",
                      color: "#F05D23",
                      textAlign: "center",
                    }}
                  >
                    {role}
                  </span>
                );
              }
              return (
                <span
                  style={{ padding: "10px", textAlign: "center" }}
                  disabled={true}
                >
                  {role}
                </span>
              );
            })}
          </div>
          <div style={{ marginLeft: "30px", paddingLeft: "10px" }}>
            <header>Proficiency</header>

            <DiscreteSliderMarks proficiency={proficiency} />
          </div>
          <div style={{ marginLeft: "30px", paddingLeft: "10px" }}>
            <header>Years of experience</header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#F2F2F2",
              }}
            >
              <button style={styles.btn}>
                <Add />
              </button>
              {yearsOfExperiance} Years
              <button style={styles.btn}>
                <Remove />
              </button>
            </div>
          </div>
        </div>
      </tr>
    </>
  );
};

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function DiscreteSliderMarks({ key, proficiency }) {
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        key={key}
        aria-label="Custom marks"
        value={proficiency}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}

export default SkillTable;
