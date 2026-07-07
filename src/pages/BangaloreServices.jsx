const BangaloreServices = () => {
  const services = [
    "Business Registration",
    "GST Consultancy",
    "Tax Filing",
    "Legal Documentation",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-center text-yellow-400">
        Bangalore Services
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 p-6 rounded-3xl backdrop-blur-md"
          >
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
              className="rounded-2xl"
            />

            <h2 className="text-2xl font-bold mt-5 text-amber-400">
              {service.title}
            </h2>

            <p className="mt-3 text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BangaloreServices;
        