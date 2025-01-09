import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './pages/Home';
import RoomList from './pages/RoomList';
import BookingList from './pages/BookingList';
import AddBooking from './pages/AddBooking';
import AllBookings from './pages/AllBookings'; // 確認已引入
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/all-bookings" element={<AllBookings />} />
        <Route path="/bookings" element={<BookingList user={user} />} />
        <Route path="/add-booking" element={<AddBooking user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;