import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

// const clientHostname = window.location.hostname;
// const isProduction = clientHostname === 'airstay.vercel.app';

// axios.defaults.baseURL = isProduction
//   ? 'https://airstay-api.onrender.com'
//   : 'http://localhost:4000';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

// axios.defaults.baseURL = 'https://airstay-api.onrender.com';
// axios.defaults.baseURL = 'https://airstay-api.vercel.app';

axios.defaults.timeout = 50000;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
