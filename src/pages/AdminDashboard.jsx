import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCharts from "../components/DashboardCharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import AdminLayout from "../components/AdminLayout";


function AdminDashboard() {
  const [applications, setApplications] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [remarks, setRemarks] =
    useState({});

  useEffect(() => {
    fetchApplications();
  }, []);


  const exportExcel = () => {
  const worksheet =
    XLSX.utils.json_to_sheet(
      applications
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Applications"
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    file,
    "Applications.xlsx"
  );
};


  const fetchApplications =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/applications"
          );

        setApplications(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const updateApplication =
    async (
      id,
      status,
      remarksText
    ) => {
      try {
        await axios.put(
          `http://localhost:5000/api/applications/${id}`,
          {
            status,
            remarks:
              remarksText,
          }
        );

        alert(
          "Application Updated Successfully"
        );

        fetchApplications();
      } catch (error) {
        console.log(error);
      }
    };

  const deleteApplication =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this application?"
        );

      if (!confirmDelete)
        return;

      try {
        await axios.delete(
          `http://localhost:5000/api/applications/${id}`
        );

        fetchApplications();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredApplications =
    applications.filter(
      (app) => {
        const name =
          app.name || "";

        const mobile =
          app.phone || "";

        return (
          name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          mobile.includes(
            search
          )
        );
      }
    );

  const total =
    applications.length;

  const pending =
    applications.filter(
      (a) =>
        a.status ===
        "Pending"
    ).length;

  const processing =
    applications.filter(
      (a) =>
        a.status ===
        "Processing"
    ).length;

  const approved =
    applications.filter(
      (a) =>
        a.status ===
        "Approved"
    ).length;

  const rejected =
    applications.filter(
      (a) =>
        a.status ===
        "Rejected"
    ).length;

  return (
  <AdminLayout>
  <section className="min-h-screen bg-slate-50 p-10">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <p className="text-gray-500">
            Total Applications
          </p>
          <h2 className="text-4xl font-bold mt-3">
            {total}
          </h2>
        </div>

        <div className="bg-yellow-50 p-6 rounded-3xl shadow-lg">
          <p className="text-yellow-700">
            Pending
          </p>
          <h2 className="text-4xl font-bold mt-3">
            {pending}
          </h2>
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl shadow-lg">
          <p className="text-blue-700">
            Processing
          </p>
          <h2 className="text-4xl font-bold mt-3">
            {processing}
          </h2>
        </div>

        <div className="bg-green-50 p-6 rounded-3xl shadow-lg">
          <p className="text-green-700">
            Approved
          </p>
          <h2 className="text-4xl font-bold mt-3">
            {approved}
          </h2>
        </div>

        <div className="bg-red-50 p-6 rounded-3xl shadow-lg">
          <p className="text-red-700">
            Rejected
          </p>
          <h2 className="text-4xl font-bold mt-3">
            {rejected}
          </h2>
        </div>

      </div>

      {/* Charts
      <div className="mb-10">
        <DashboardCharts
          pending={pending}
          processing={processing}
          approved={approved}
          rejected={rejected}
        />
      </div> */}

      {/* Export Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={exportExcel}
          className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            hover:bg-green-700
            transition
            shadow-lg
          "
        >
          Export Excel
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name or Mobile"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          p-4
          rounded-2xl
          border
          bg-white
          mb-8
          outline-none
          shadow-sm
        "
      />

      

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">
          <table className="w-full">

            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5">
                  Name
                </th>
                <th className="p-5">
                  Service
                </th>
                <th className="p-5">
                  Mobile
                </th>
                <th className="p-5">
                  Documents
                </th>
                <th className="p-5">
                  Status
                </th>
                <th className="p-5">
                  Remarks
                </th>
                <th className="p-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map(
                (app) => (
                  <tr
                    key={app._id}
                    className="border-b"
                  >
                    <td className="p-5">
                      {app.name}
                    </td>

                    <td className="p-5">
                      {app.service}
                    </td>

                    <td className="p-5">
                      {app.phone}
                    </td>

                    {/* Documents */}
                    <td className="p-5">
                      {app.documents
                        ?.length >
                      0 ? (
                        <div className="space-y-3">
                          {app.documents.map(
                            (
                              doc,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="bg-gray-100 rounded-xl p-3"
                              >
                                <p className="text-sm break-all">
                                  📄{" "}
                                  {
                                    doc
                                  }
                                </p>

                                <div className="flex gap-3 mt-3">
                                  <a
                                    href={`http://localhost:5000/uploads/${doc}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                                  >
                                    View
                                  </a>

                                  <a
                                    href={`http://localhost:5000/download/${doc}`}
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg"
                                  >
                                    Download
                                  </a>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span>
                          No
                          Documents
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <select
                        value={
                          app.status
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            applications.map(
                              (
                                a
                              ) =>
                                a._id ===
                                app._id
                                  ? {
                                      ...a,
                                      status:
                                        e
                                          .target
                                          .value,
                                    }
                                  : a
                            );

                          setApplications(
                            updated
                          );
                        }}
                        className="border rounded-xl p-2"
                      >
                        <option>
                          Pending
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Approved
                        </option>

                        <option>
                          Rejected
                        </option>
                      </select>
                    </td>

                    {/* Remarks */}
                    <td className="p-5">
                      <textarea
                        value={
                          remarks[
                            app
                              ._id
                          ] ??
                          app.remarks ??
                          ""
                        }
                        onChange={(
                          e
                        ) =>
                          setRemarks(
                            {
                              ...remarks,
                              [
                                app
                                  ._id
                              ]:
                                e
                                  .target
                                  .value,
                            }
                          )
                        }
                        placeholder="Enter remarks..."
                        className="
                          border
                          rounded-xl
                          p-3
                          w-56
                          h-24
                          resize-none
                        "
                      />
                    </td>

                    {/* Actions */}
                    <td className="p-5 space-y-3">
                      <button
                        onClick={() =>
                          updateApplication(
                            app._id,
                            app.status,
                            remarks[
                              app
                                ._id
                            ] ??
                              app.remarks ??
                              ""
                          )
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          hover:bg-blue-600
                          block
                          mb-3
                        "
                      >
                        Update
                      </button>

                      <button
                        onClick={() =>
                          deleteApplication(
                            app._id
                          )
                        }
                        className="
                          bg-red-500
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          hover:bg-red-600
                        "
                      >
                        Delete
                      </button>

                      
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>
      </div>
      </section>
  </AdminLayout>
  );
}
   

export default AdminDashboard;