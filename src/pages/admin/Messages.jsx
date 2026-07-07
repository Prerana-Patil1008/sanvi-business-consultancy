// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminLayout from "../../layouts/AdminLayout";
// import DashboardCard from "../../components/admin/DashboardCard";

// import {
//   Search,
//   RefreshCcw,
//   Mail,
//   MailOpen,
//   Trash2,
//   Eye,
// } from "lucide-react";

// function Messages() {

//   const navigate = useNavigate();

//   const [messages, setMessages] = useState([]);

//   const [filteredMessages, setFilteredMessages] =
//     useState([]);

//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

 

//   useEffect(() => {
//     loadMessages();
//   }, []);

//   useEffect(() => {

//     const value = search.toLowerCase();

//     setFilteredMessages(

//       messages.filter((msg) =>
//         msg.name.toLowerCase().includes(value) ||
//         msg.email.toLowerCase().includes(value) ||
//         msg.subject.toLowerCase().includes(value)
//       )

//     );

//   }, [search, messages]);

//   const loadMessages = async () => {

//     try {

//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:5000/api/contacts"
//       );

//       setMessages(res.data);

//     } catch (err) {

//       console.log(err);

//     } finally {

//       setLoading(false);

//     }

//   };

//   const deleteMessage = async (id) => {

//     if (!window.confirm("Delete this message?"))
//       return;

//     try {

//       await axios.delete(
//         `http://localhost:5000/api/contacts/${id}`
//       );

//       loadMessages();

//     } catch (err) {

//       console.log(err);

//       alert("Delete Failed");

//     }

//   };

//   const markAsRead = async (id) => {

//     try {

//       await axios.put(
//         `http://localhost:5000/api/contacts/${id}`
//       );

//       loadMessages();

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   const totalMessages =
//     filteredMessages.length;

//   const unreadMessages =
//     filteredMessages.filter(
//       (m) => m.status === "Unread"
//     ).length;

//   const readMessages =
//     filteredMessages.filter(
//       (m) => m.status === "Read"
//     ).length;

//   return (

//     <AdminLayout>
//           {/* Header */}

//       <div className="flex justify-between items-center mb-8">

//         <div>

//           <h1 className="text-4xl font-bold text-slate-800">
//             Messages
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Manage customer enquiries
//           </p>

//         </div>

//         <button
//           onClick={loadMessages}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
//         >
//           <RefreshCcw size={18} />
//           Refresh
//         </button>

//       </div>

//       {/* Dashboard Cards */}

//       <div className="grid md:grid-cols-3 gap-6 mb-8">

//         <DashboardCard
//           title="Total Messages"
//           value={totalMessages}
//           icon={Mail}
//           iconBg="bg-blue-100"
//           iconColor="text-blue-600"
//         />

//         <DashboardCard
//           title="Unread"
//           value={unreadMessages}
//           icon={Mail}
//           iconBg="bg-yellow-100"
//           iconColor="text-yellow-600"
//         />

//         <DashboardCard
//           title="Read"
//           value={readMessages}
//           icon={MailOpen}
//           iconBg="bg-green-100"
//           iconColor="text-green-600"
//         />

//       </div>

//       {/* Search */}

//       <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

//         <div className="relative">

//           <Search
//             size={18}
//             className="absolute left-4 top-4 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search messages..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//         </div>

//       </div>

//       {loading ? (

//         <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

//           <h2 className="text-2xl font-bold">
//             Loading Messages...
//           </h2>

//         </div>

//       ) : (

//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead className="bg-slate-100">

//                 <tr>

//                   <th className="text-left p-4">Customer</th>

//                   <th className="text-left p-4">Subject</th>

//                   <th className="text-left p-4">Status</th>

//                   <th className="text-left p-4">Date</th>

//                   <th className="text-center p-4">
//                     Actions
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>
//                 {filteredMessages.length > 0 ? (

//   filteredMessages.map((message) => (

//     <tr
//       key={message._id}
//       className="border-b hover:bg-slate-50 transition"
//     >

//       {/* Customer */}

//       <td className="p-4">

//         <div>

//           <h3 className="font-semibold text-slate-800">
//             {message.name}
//           </h3>

//           <p className="text-sm text-gray-500">
//             {message.email}
//           </p>

//         </div>

//       </td>

//       {/* Subject */}

//       <td className="p-4">
//         {message.subject}
//       </td>

//       {/* Status */}

//       <td className="p-4">

//         <span
//           className={`px-3 py-1 rounded-full text-sm font-medium ${
//             message.status === "Read"
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {message.status}
//         </span>

//       </td>

//       {/* Date */}

//       <td className="p-4">

//         {new Date(
//           message.createdAt
//         ).toLocaleDateString("en-IN")}

//       </td>

//       {/* Actions */}

//       <td className="p-4">

//         <div className="flex justify-center gap-3">

//           <button
//   onClick={() =>
//     navigate(`/admin/messages/${message._id}`)
//   }
//   className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
// >
//   <Eye size={18} />
// </button>

//           {message.status === "Unread" && (

//             <button
//               onClick={() =>
//                 markAsRead(message._id)
//               }
//               className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg text-sm"
//             >
//               Read
//             </button>

//           )}

//           <button
//             onClick={() =>
//               deleteMessage(message._id)
//             }
//             className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
//           >
//             <Trash2 size={18} />
//           </button>

//         </div>

//       </td>

//     </tr>

//   ))

// ) : (

//   <tr>

//     <td
//       colSpan="5"
//       className="text-center py-12 text-gray-500"
//     >
//       No Messages Found
//     </td>

//   </tr>

// )}
//               </tbody>

//             </table>

//           </div>

//         </div>

//       )}
// {/* Message Details Modal */}
// {selectedMessage && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

//     <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8 relative">

//       <button
//         onClick={() => setSelectedMessage(null)}
//         className="absolute top-5 right-6 text-3xl font-bold text-gray-500 hover:text-black"
//       >
//         ×
//       </button>

//       <h2 className="text-3xl font-bold mb-8">
//         Message Details
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">

//         <div>
//           <label className="font-semibold">
//             Name
//           </label>

//           <input
//             value={selectedMessage.name}
//             readOnly
//             className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">
//             Email
//           </label>

//           <input
//             value={selectedMessage.email}
//             readOnly
//             className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">
//             Phone
//           </label>

//           <input
//             value={selectedMessage.phone}
//             readOnly
//             className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">
//             Subject
//           </label>

//           <input
//             value={selectedMessage.subject}
//             readOnly
//             className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
//           />
//         </div>

//       </div>

//       <div className="mt-6">

//         <label className="font-semibold">
//           Message
//         </label>

//         <textarea
//           rows={6}
//           value={selectedMessage.message}
//           readOnly
//           className="w-full mt-2 border rounded-xl p-3 bg-gray-100 resize-none"
//         />

//       </div>

//       <div className="flex justify-end mt-8">

//         <button
//           onClick={() => setSelectedMessage(null)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
//         >
//           Close
//         </button>

//       </div>

//     </div>

//   </div>
// )}
      
//           </AdminLayout>

//   );

// }

// export default Messages;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Search,
  RefreshCcw,
  Mail,
  MailOpen,
  Trash2,
  Eye,
} from "lucide-react";

function Messages() {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =============================
  // Load Messages
  // =============================

  useEffect(() => {
    loadMessages();
  }, []);

  // =============================
  // Search Filter
  // =============================

  useEffect(() => {

    const value = search.toLowerCase();

    const filtered = messages.filter((msg) =>
      msg.name.toLowerCase().includes(value) ||
      msg.email.toLowerCase().includes(value) ||
      msg.subject.toLowerCase().includes(value)
    );

    setFilteredMessages(filtered);

  }, [search, messages]);

  // =============================
  // Fetch Messages
  // =============================

  const loadMessages = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/contacts"
      );

      setMessages(res.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load messages.");

    } finally {

      setLoading(false);

    }

  };

  // =============================
  // Delete Message
  // =============================

  const deleteMessage = async (id) => {

    if (!window.confirm("Delete this message?"))
      return;

    try {

      await axios.delete(
        `http://localhost:5000/api/contacts/${id}`
      );

      loadMessages();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  // =============================
  // Mark As Read
  // =============================

  const markAsRead = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/contacts/${id}`
      );

      loadMessages();

    } catch (error) {

      console.log(error);

    }

  };

  // =============================
  // Dashboard Counts
  // =============================

  const totalMessages = filteredMessages.length;

  const unreadMessages = filteredMessages.filter(
    (msg) => msg.status === "Unread"
  ).length;

  const readMessages = filteredMessages.filter(
    (msg) => msg.status === "Read"
  ).length;

  return (

    <AdminLayout>

  {/* Header */}

  <div className="flex justify-between items-center mb-8">

    <div>

      <h1 className="text-4xl font-bold text-slate-800">
        Messages
      </h1>

      <p className="text-gray-500 mt-2">
        Manage customer enquiries
      </p>

    </div>

    <button
      onClick={loadMessages}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
    >
      <RefreshCcw size={18} />
      Refresh
    </button>

  </div>

  {/* Dashboard Cards */}

  <div className="grid md:grid-cols-3 gap-6 mb-8">

    <DashboardCard
      title="Total Messages"
      value={totalMessages}
      icon={Mail}
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
    />

    <DashboardCard
      title="Unread"
      value={unreadMessages}
      icon={Mail}
      iconBg="bg-yellow-100"
      iconColor="text-yellow-600"
    />

    <DashboardCard
      title="Read"
      value={readMessages}
      icon={MailOpen}
      iconBg="bg-green-100"
      iconColor="text-green-600"
    />

  </div>

  {/* Search */}

  <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-4 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

  </div>

  {/* Table */}

  {loading ? (

    <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

      <h2 className="text-2xl font-bold">
        Loading Messages...
      </h2>

    </div>

  ) : (

    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Subject
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
            {filteredMessages.length > 0 ? (

  filteredMessages.map((message) => (

    <tr
      key={message._id}
      className="border-b hover:bg-slate-50 transition"
    >

      {/* Customer */}

      <td className="p-4">

        <div>

          <h3 className="font-semibold text-slate-800">
            {message.name}
          </h3>

          <p className="text-sm text-gray-500">
            {message.email}
          </p>

        </div>

      </td>

      {/* Subject */}

      <td className="p-4">
        {message.subject}
      </td>

      {/* Status */}

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            message.status === "Read"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {message.status}
        </span>

      </td>

      {/* Date */}

      <td className="p-4">
        {new Date(
          message.createdAt
        ).toLocaleDateString("en-IN")}
      </td>

      {/* Actions */}

      <td className="p-4">

        <div className="flex justify-center gap-3">

          {/* View */}

          <button
            onClick={() =>
              navigate(`/admin/messages/${message._id}`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            <Eye size={18} />
          </button>

          {/* Mark Read */}

          {message.status === "Unread" && (

            <button
              onClick={() =>
                markAsRead(message._id)
              }
              className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg text-sm"
            >
              Read
            </button>

          )}

          {/* Delete */}

          <button
            onClick={() =>
              deleteMessage(message._id)
            }
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>

  ))

) : (

  <tr>

    <td
      colSpan="5"
      className="text-center py-12 text-gray-500"
    >
      No Messages Found
    </td>

  </tr>

)}

          </tbody>

        </table>

      </div>

    </div>

  )}

</AdminLayout>

);

}

export default Messages;
