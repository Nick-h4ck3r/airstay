import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

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
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
