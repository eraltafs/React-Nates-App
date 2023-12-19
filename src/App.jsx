import { Route, Routes } from "react-router-dom"
import NavbarCom from "./components/NavbarCom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import "./App.css"
import AlertCom from "./components/AlertCom"
function App() {
  return (
    <div>
      <NavbarCom />
      <AlertCom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
