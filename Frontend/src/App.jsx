import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import SurveyPage from "./pages/SurveyPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/survey" element={<SurveyPage />} />
      </Routes>
    </>
  );
}

export default App;
