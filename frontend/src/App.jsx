import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListingPage from './pages/EditListingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyListingsPage from './pages/MyListingsPage';
import AboutYMCAPage from './pages/AboutYMCAPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/listings/:id/edit" element={<EditListingPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/about-ymca" element={<AboutYMCAPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
