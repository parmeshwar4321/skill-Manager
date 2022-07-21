import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skill from "./Pages/Skills/Skill";
import SkillManage from "./Pages/SkillManage/SkillManage";
function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Skill />} />
        <Route exact path="/manage" element={<SkillManage />} />
        <Route exact path="/*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
