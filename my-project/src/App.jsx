import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginComponent from './Components/Login';
import { LoginComponent, RegisterComponent } from "../src/index";

function App() {
  return (
    <div className="h-screen w-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
