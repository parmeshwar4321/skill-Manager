import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import "./skill.css";
import SkillTable from "./SkillTable";
import axios from "axios";
const Skill = () => {
  const [skills, setSkills] = useState([]);
  async function fetchSkills() {
    let url = `http://localhost:2021/skills/getAllSkills`;
    try {
      let { data } = await axios.get(url);
      console.log(data);
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  }
  let navigate = useNavigate();
  const handler = () => {
    navigate("/manage");
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Skills</h1>
      <div>
        <table style={{ padding: "40px 0px" }}>
          <thead
            style={{
              fontFamily: "roboto",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "21px",
              letterSpacing: "1px",
            }}
          >
            <tr>
              <th> Skill</th>
              <th>Assessments</th>
            </tr>
          </thead>
          <tbody>
            {skills.length &&
              skills?.map((item, i) => {
                return (
                  <SkillTable
                    key={i}
                    skillName={item.skillName}
                    isExpert={item.isExpert}
                    level={item.level}
                    proficiency={item.proficiency}
                    yearsOfExperiance={item.yearsOfExperiance}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <Button
        style={{ backgroundColor: "#F05D23", color: "#fff" }}
        onClick={handler}
      >
        <Edit />
        Manage Skill
      </Button>
    </>
  );
};

export default Skill;
