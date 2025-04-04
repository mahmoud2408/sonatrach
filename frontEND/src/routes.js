// frontend/src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Members from "./pages/Members";
import Activities from "./pages/Activities";
import CreateProfile from "./pages/CreateProfile";
import TakeAppointment from "./pages/TakeAppointment";
import Login from "./pages/Login";
import BoutiqueEnLigne from "./pages/BoutiqueEnLigne";
import Prix from "./components/Prix";
import InscriptionActivite from "./pages/InscriptionActivite";
import ContactPage from "./pages/ContactPage";
import ResetPassword from "./pages/ResetPassword";
import AdminActivities from "./pages/AdminActivities";
import AdminMembers from "./pages/AdminMembers";
import PaiementAbonnement from "./pages/PaiementAbonnement";
import AdminRoute from "./components/AdminRoute";
import EmailSender from "./pages/EmailSender";

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/members" element={<Members />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/profil" element={<CreateProfile />} />
      <Route path="/rendezvous" element={<TakeAppointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/boutique-en-ligne" element={<BoutiqueEnLigne />} />
      <Route path="/prix" element={<Prix />} />
      <Route path="/inscription-activite" element={<InscriptionActivite />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/paiement-abonnement" element={<PaiementAbonnement />} />
      <Route path="/send-mails" element={<EmailSender />} />

      {/* Routes réservées aux administrateurs */}
      <Route
        path="/admin/activities"
        element={
          <AdminRoute>
            <AdminActivities />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/members"
        element={
          <AdminRoute>
            <AdminMembers />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default RoutesConfig;
