
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res =
        await axios.post(
          "http://localhost:5000/api/admin/login",
          formData
        );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          res.data.admin
        )
      );

      alert(
        "Admin Login Successful"
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(
          error.response.data
            .message
        );
      } else {
        alert(
          "Login Failed"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl w-[450px] shadow-2xl">

        <h1 className="text-4xl font-bold text-amber-400 text-center">
          Admin Login
        </h1>

        <div className="mt-8 flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="p-4 rounded-xl bg-black/30 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="p-4 rounded-xl bg-black/30 text-white outline-none"
          />

          <button
            onClick={
              handleLogin
            }
            className="bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

