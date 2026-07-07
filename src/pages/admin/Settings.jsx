import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

function Settings() {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({

    businessName: "",

    tagline: "",

    phone1: "",

    phone2: "",

    email: "",

    whatsapp: "",

    website: "",

    address: "",

    officeHours: "",

    googleMap: "",

    facebook: "",

    instagram: "",

    linkedin: "",

    youtube: "",

  });

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/settings"
      );

      setFormData(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load settings.");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const saveSettings = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await axios.put(
        "https://sanvi-business-consultancy.onrender.com/api/settings",
        formData
      );

      alert("Settings Updated Successfully");

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

          <h2 className="text-3xl font-bold">

            Loading Settings...

          </h2>

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Business Settings

        </h1>

        <p className="text-gray-500 mt-2">

          Update your company information

        </p>

      </div>

      <form
        onSubmit={saveSettings}
        className="bg-white rounded-2xl shadow-sm p-8"
      >
        {/* Business Information */}

<h2 className="text-2xl font-bold mb-6">
  Business Information
</h2>

<div className="grid md:grid-cols-2 gap-6 mb-10">

  <div>
    <label className="font-semibold">
      Business Name
    </label>

    <input
      type="text"
      name="businessName"
      value={formData.businessName}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Tagline
    </label>

    <input
      type="text"
      name="tagline"
      value={formData.tagline}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

</div>

{/* Contact Information */}

<h2 className="text-2xl font-bold mb-6">
  Contact Information
</h2>

<div className="grid md:grid-cols-2 gap-6 mb-10">

  <div>
    <label className="font-semibold">
      Mobile Number 1
    </label>

    <input
      type="text"
      name="phone1"
      value={formData.phone1}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Mobile Number 2
    </label>

    <input
      type="text"
      name="phone2"
      value={formData.phone2}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      WhatsApp Number
    </label>

    <input
      type="text"
      name="whatsapp"
      value={formData.whatsapp}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Website
    </label>

    <input
      type="text"
      name="website"
      value={formData.website}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Office Hours
    </label>

    <input
      type="text"
      name="officeHours"
      value={formData.officeHours}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

</div>
{/* Address */}

<h2 className="text-2xl font-bold mb-6">
  Address
</h2>

<div className="grid gap-6 mb-10">

  <div>
    <label className="font-semibold">
      Office Address
    </label>

    <textarea
      rows={4}
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3 resize-none"
    />
  </div>

  <div>
    <label className="font-semibold">
      Google Maps Link
    </label>

    <input
      type="text"
      name="googleMap"
      value={formData.googleMap || "https://www.google.com/maps?q=12.9679762,77.5230474&z=17&output=embed"}
      onChange={handleChange}
      placeholder="Paste Google Maps Embed URL"
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

</div>

{/* Social Media */}

<h2 className="text-2xl font-bold mb-6">
  Social Media
</h2>

<div className="grid md:grid-cols-2 gap-6 mb-10">

  <div>
    <label className="font-semibold">
      Facebook
    </label>

    <input
      type="text"
      name="facebook"
      value={formData.facebook}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      Instagram
    </label>

    <input
      type="text"
      name="instagram"
      value={formData.instagram}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      LinkedIn
    </label>

    <input
      type="text"
      name="linkedin"
      value={formData.linkedin}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

  <div>
    <label className="font-semibold">
      YouTube
    </label>

    <input
      type="text"
      name="youtube"
      value={formData.youtube}
      onChange={handleChange}
      className="w-full mt-2 border rounded-xl p-3"
    />
  </div>

</div>

{/* Save Button */}

<div className="flex justify-end">

  <button
    type="submit"
    disabled={saving}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold disabled:bg-gray-400"
  >
    {saving ? "Saving..." : "Save Settings"}
  </button>

</div>

</form>

</AdminLayout>

);

}

export default Settings;