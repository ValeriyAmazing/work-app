// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable";
import StudentsList from "./components/StudentsList/StudentsList";
import { LessonsProvider } from "./context/LessonsContext";
import "./App.css";

function App() {
  return (
    <Router>
      <LessonsProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ScheduleTable />} />
            <Route path="/students" element={<StudentsList />} />
          </Routes>
        </div>
      </LessonsProvider>
    </Router>
  );
}

export default App;
