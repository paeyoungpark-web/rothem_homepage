/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import ServiceDetail from './pages/ServiceDetail';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import SettingsPage from './pages/SettingsPage';
import InsightsPage from './pages/InsightsPage';
import GalleryPage from './pages/GalleryPage';
import InquiriesPage from './pages/InquiriesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SelfAssessmentSection from './components/SelfAssessmentSection';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import FloatingButtons from './components/FloatingButtons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Use a wrapper component for standalone Checklist page
const ChecklistPage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors flex flex-col">
    <Navbar />
    <main className="flex-grow pt-20">
      <SelfAssessmentSection />
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
          </Routes>
          <FloatingButtons />
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
    </HelmetProvider>
  );
}
