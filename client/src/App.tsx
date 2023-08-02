import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";


// const clientHostname = window.location.hostname;
// const isProduction = clientHostname === 'airsat.vercel.app';

// axios.defaults.baseURL = isProduction
//   ? 'https://airstay-api.onrender.com/'
//   : 'http://localhost:4000';

axios.defaults.baseURL = 'https://airstay-api.onrender.com/';

axios.defaults.timeout = 50000;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
