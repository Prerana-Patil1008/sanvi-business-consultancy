import { useState } from "react";
import axios from "axios";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    notes: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          service: formData.service,
        }
      );

      console.log(response.data);

      if (selectedFile) {
        setUploadedFiles([...uploadedFiles, selectedFile]);
      }

      alert("Customer Details Submitted Successfully ✅");

      setFormData({
        name: "",
        mobile: "",
        email: "",
        service: "",
        notes: "",
      });

      setSelectedFile(null);

    } catch (error) {
      console.error(error);

      alert("Error Saving Customer Data ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 py-28">

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-400">
          Upload Documents
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Securely upload your required consultancy documents.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto mt-20 bg-slate-900 border border-slate-800 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl">

        <form
          onSubmit={handleUpload}
          className="flex flex-col gap-8"
        >

          {/* Customer Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer Name"
            required
            className="p-5 rounded-2xl bg-black/30 outline-none border border-purple-500 focus:border-yellow-400"
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="p-5 rounded-2xl bg-black/30 outline-none border border-purple-500 focus:border-yellow-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-5 rounded-2xl bg-black/30 outline-none border border-purple-500 focus:border-yellow-400"
          />

          {/* Service */}
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="p-5 rounded-2xl bg-gray-900 text-white border border-purple-500 focus:border-yellow-400"
          >
            <option value="">Select Service</option>

            <option>GST Registration and Filing</option>
            <option>Income Tax Filing</option>
            <option>ESI, PF and TDS Filing</option>
            <option>ISO and Trade Mark Registration</option>
            <option>Partnership Firm Registration</option>
            <option>Import and Export Code Registration</option>
            <option>PF Withdrawal and Registration</option>
            <option>Accounting and Audit Reports</option>
            <option>Pvt Ltd Registration</option>
            <option>Passport Services</option>
            <option>PAN Card Services</option>
            <option>Aadhaar Address Change</option>

            <option>Marriage Certificate</option>
            <option>Birth and Death Certificate</option>
            <option>Caste and Income Certificate</option>
            <option>Domicile Certificate</option>
            <option>Business License</option>
            <option>Voter ID Services</option>
            <option>Senior Citizen Card</option>
            <option>Ration Card Services</option>
            <option>Police Verification</option>
            <option>Labour Card</option>
            <option>Food License</option>

          </select>

          {/* File Upload */}
          <div className="bg-black/30 p-6 rounded-2xl">

            <label className="text-xl font-semibold block mb-4">
              Upload Required Documents
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full"
            />

            {selectedFile && (
              <div className="mt-4 text-green-300">
                Selected File: {selectedFile.name}
              </div>
            )}

          </div>

          {/* Notes */}
          <textarea
            rows="5"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Information"
            className="p-5 rounded-2xl bg-black/30 outline-none border border-purple-500 focus:border-yellow-400"
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black py-5 rounded-2xl font-bold text-xl hover:bg-yellow-300 transition duration-300"
          >
            Submit Request
          </button>

        </form>

        {/* Uploaded Files */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold text-amber-400">
            Uploaded Files
          </h2>

          <div className="mt-8 space-y-4">

            {uploadedFiles.length === 0 ? (
              <p>No files uploaded yet.</p>
            ) : (
              uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center"
                >
                  <span>{file.name}</span>

                  <button className="bg-green-500 px-4 py-2 rounded-xl">
                    Uploaded
                  </button>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Upload;