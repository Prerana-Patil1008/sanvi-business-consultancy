import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

function ApplicationDetails() {

  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchApplication();

  }, []);

  const fetchApplication = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/applications/${id}`
      );

      setApplication(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-2xl">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!application) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-red-500 text-2xl">
          Application Not Found
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="bg-white rounded-3xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Application Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">Customer Name</label>
            <p>{application.name}</p>
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <p>{application.email}</p>
          </div>

          <div>
            <label className="font-semibold">Phone</label>
            <p>{application.mobile}</p>
          </div>

          <div>
            <label className="font-semibold">Service</label>
            <p>{application.service}</p>
          </div>

          <div>
            <label className="font-semibold">Status</label>
            <p>{application.status}</p>
          </div>

          <div>
            <label className="font-semibold">Applied On</label>
            <p>
              {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Message</label>
            <p>{application.message || "No Message"}</p>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Remarks</label>
            <p>{application.remarks || "No Remarks"}</p>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default ApplicationDetails;