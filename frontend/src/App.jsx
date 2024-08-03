import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './Context/UserContext';
import Places from './pages/Places';
import PlaceID from './pages/PlaceID';
import ProfilePage from './pages/ProfilePage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlaceHeroPage from './pages/PlaceHeroPage';
import BookingPage from './pages/BookingPage';
import SingleBooking from './pages/SingleBooking';

axios.defaults.baseURL = 'http://localhost:3500';
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={< ProfilePage/>} />
          <Route path="/account/bookings/" element={< BookingPage/>} />
          <Route path="/account/bookings/:id" element={<SingleBooking />} />
          <Route path="/account/places" element={< Places/>} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={< PlaceID/>} />
          <Route path='/account/places/edit/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlaceHeroPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
        );
};
export default App;
