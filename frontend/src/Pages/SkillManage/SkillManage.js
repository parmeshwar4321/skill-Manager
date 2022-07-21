import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Search from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/HighlightOff";
import Add from "@mui/icons-material/ControlPoint";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SkillTable from "./SkillManageTable";
import "./manage.css";
const SkillManage = () => {
  const [Skills, setSkills] = useState([{ item: "hello" }]);
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
    navigate("/");
  };
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <ArrowBack onClick={handler} />
        </IconButton>
        Manage Skills
      </div>
      <div
        style={{
          "font-family": "Roboto",
          "font-style": "normal",
          "font-weight": "500",
          "font-size": "16px",
          "line-height": "21px",
        }}
      >
        Add new skills you possess or update existing skills
        <br />
        <span
          style={{
            "font-family": "Roboto",
            "font-style": "normal",
            "font-weight": "400",
            "font-size": "12px",
            "line-height": "15px",
          }}
        >
          Assess yourself in the skills you have selected.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "16px",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#F2F2F2",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "45rem",
          }}
        >
          {Skills?.map((item, i) => {
            return (
              <div
                style={{
                  fontFamily: "Roboto",
                  borderRadius: "6px",
                  background: "#fff",
                  color: "#192A3E",
                  fontWeight: "bold",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                size="small"
                key={i}
              >
                {item?.skillName}
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
            );
          })}

          <span>
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </span>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "#F05D23", color: "#fff" }}
            onClick={""}
          >
            <Add />
            Add New Skills
          </Button>
        </div>
      </div>
      <div>
        <table>
          <tbody>
            {Skills.length &&
              Skills?.map((item, i) => {
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

      <Button onClick={handler}>cancel</Button>
      <Button
        style={{ backgroundColor: "#F05D23", color: "#fff" }}
        onClick={""}
      >
        Save
      </Button>
    </div>
  );
};

export default SkillManage;
