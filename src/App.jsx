import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import TestimonialForm from "./pages/TestimonialForm";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import Customers from "./pages/admin/Customers";
import ServicesAdmin from "./pages/admin/Services";
import Messages from "./pages/admin/Messages";
import MessageDetails from "./pages/admin/MessageDetails";
import Testimonials from "./pages/admin/Testimonials";
import TestimonialDetails from "./pages/admin/TestimonialDetails";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import ApplicationDetails from "./pages/admin/ApplicationDetails";
import PaymentSettings from "./pages/admin/PaymentSettings";
import Payments from "./pages/admin/Payments";
import Receipt from "./pages/Receipt";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/testimonial/:applicationId"
          element={<TestimonialForm />}
        />

        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <Applications />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <AdminProtectedRoute>
              <Customers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <AdminProtectedRoute>
              <Payments />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/applications/:id"
          element={
            <AdminProtectedRoute>
              <ApplicationDetails />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/payment-settings"
          element={
            <AdminProtectedRoute>
              <PaymentSettings />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminProtectedRoute>
              <ServicesAdmin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <AdminProtectedRoute>
              <Messages />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/messages/:id"
          element={
            <AdminProtectedRoute>
              <MessageDetails />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/testimonials"
          element={
            <AdminProtectedRoute>
              <Testimonials />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/testimonials/:id"
          element={
            <AdminProtectedRoute>
              <TestimonialDetails />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <Reports />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <Settings />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />


        <Route
          path="/receipt/:paymentId"
          element={<Receipt />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;