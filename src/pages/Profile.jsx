import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
  });

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/users/${user._id}`,
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Updated Successfully");

      setEditing(false);

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Unable to update profile.");

    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-32 pb-20">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-slate-900 mb-12">
            My Profile
          </h1>

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="flex items-center gap-6 mb-10">

              <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                {user.name?.charAt(0).toUpperCase()}

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-500">
                  Customer Account
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <label className="text-gray-500 text-sm">
                  Full Name
                </label>

                <p className="text-xl font-semibold mt-1">
                  {user.name}
                </p>

              </div>

              <div>

                <label className="text-gray-500 text-sm">
                  Email Address
                </label>

                <p className="text-xl font-semibold mt-1">
                  {user.email}
                </p>

              </div>

              <div>

                <label className="text-gray-500 text-sm">
                  Mobile Number
                </label>

                <p className="text-xl font-semibold mt-1">
                  {user.mobile || "Not Available"}
                </p>

              </div>

              <div>

                <label className="text-gray-500 text-sm">
                  Role
                </label>

                <p className="text-xl font-semibold mt-1">
                  {user.role || "Customer"}
                </p>

              </div>

            </div>

            <div className="mt-12 flex gap-4 flex-wrap">

              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/my-applications")}
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                My Applications
              </button>

            </div>

          </div>

        </div>

        {editing && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

              <h2 className="text-3xl font-bold mb-8">
                Edit Profile
              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                  className="w-full border rounded-xl p-4"
                />

                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value,
                    })
                  }
                  placeholder="Mobile Number"
                  className="w-full border rounded-xl p-4"
                />

              </div>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={() => setEditing(false)}
                  className="border px-6 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProfile}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )}

      </section>

      <Footer />

    </>
  );
}

export default Profile;