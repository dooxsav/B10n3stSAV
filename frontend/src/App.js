import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomeComponent from "./features/public/pages/welcome.page/welcome.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<WelcomeComponent />} />
    </Routes>
  );
}

export default App;
