
import { useState } from "react";
import axios from "axios";

function ApplicationModal({
  showForm,
  setShowForm,
  selectedService,
}) {
  const [documents, setDocuments] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });

  if (!showForm) return null;

  // Input Change
  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Multiple File Upload
  const handleFileChange = (e) => {
    const files = Array.from(
      e.target.files
    );

    setDocuments((prev) => [
      ...prev,
      ...files,
    ]);

    // Allow selecting same file again
    e.target.value = "";
  };

  // Remove File
  const removeFile = (index) => {
    setDocuments((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert(
          "Please login first."
        );
        return;
      }

      const data =
        new FormData();

      data.append(
        "user",
        user._id
      );

      data.append(
        "service",
        selectedService
      );

      data.append(
        "name",
        formData.name
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "mobile",
        formData.mobile
      );

      data.append(
        "message",
        formData.message
      );

      documents.forEach((file) => {
        data.append(
          "documents",
          file
        );
      });
      
      console.log("User:", user);
      console.log("User ID:", user._id);


      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post(
        "http://localhost:5000/api/applications",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Application Submitted Successfully!"
      );

      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });

      setDocuments([]);
      setShowForm(false);
    } catch (error) {
      console.log(
        "ERROR:",
        error
      );

      if (error.response) {
        console.log(
          "Response:",
          error.response.data
        );
      }

      alert(
        "Submission Failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[32px] w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={() =>
            setShowForm(false)
          }
          className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-slate-900">
          Apply for Service
        </h2>

        <p className="mt-3 text-gray-500">
          Selected Service:
          <span className="text-blue-600 font-semibold">
            {" "}
            {selectedService}
          </span>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            required
            value={formData.mobile}
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          {/* Upload */}
          <div>
            <label className="font-semibold text-slate-900">
              Upload Documents
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 mt-3 text-center">
              <input
                type="file"
                multiple
                id="documents"
                onChange={
                  handleFileChange
                }
                className="hidden"
              />

              <label
                htmlFor="documents"
                className="cursor-pointer text-blue-600 font-semibold"
              >
                📎 Click to Upload Documents
              </label>

              <p className="text-gray-500 text-sm mt-2">
                JPG, PNG, PDF
                (Multiple files allowed)
              </p>
            </div>

            {/* File List */}
            {documents.length >
              0 && (
              <div className="mt-5 space-y-3">
                {documents.map(
                  (
                    file,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="flex justify-between items-center bg-gray-100 rounded-xl p-4"
                    >
                      <span className="truncate">
                        📄{" "}
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeFile(
                            index
                          )
                        }
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <textarea
            rows="5"
            name="message"
            placeholder="Additional Message"
            value={
              formData.message
            }
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationModal;

