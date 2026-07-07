const mongoose = require("mongoose");
require("dotenv").config();

const Service = require("./models/Service");

const services = [

  // ================= PAN INDIA =================

  {
    title: "GST Registration and Monthly, Quarterly & Annual Filing",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Income Tax Filing",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "ESI, PF and TDS Filing",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "ISO and Trade Mark Registration",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Partnership Firm Registration",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Import and Export Code Registration",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "PF Withdrawal and Registration",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "All Accounting and Audit Reports",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Pvt Ltd Registration",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "15H and 15G Services",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Passport Services",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "PAN Card Services",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  {
    title: "Aadhaar Address Change",
    category: "Pan India",
    description: { service.description },
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  },

  // ================= KARNATAKA =================

  {
    title: "Marriage Certificate",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Birth and Death Certificate",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Caste and Income Certificate",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Domicile / Residence Certificate",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Business License",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Form C (Shop and Establishment Certificate)",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Voter ID Services",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Senior Citizen Card",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Ration Card Services",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "All Types of Pension",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "RTC / EC",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Police Verification",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Labour Card",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Karnataka Scholarship Applications",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "Food License",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

  {
    title: "All Job Applications",
    category: "Karnataka",
    description: "Trusted Karnataka consultancy service.",
    price: "Contact Us",
    icon: "📄",
    status: "Active",
  },

];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {

    await Service.deleteMany();

    await Service.insertMany(services);

    console.log("Services Seeded Successfully");

    process.exit();

  })
  .catch((err) => {

    console.log(err);

    process.exit(1);

  });