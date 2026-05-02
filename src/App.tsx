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
import { SettingsProvider } from './context/SettingsContext';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </SettingsProvider>
  );
}
