import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-amber-400 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-slate-900 rounded-[40px] p-12 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Need Help With Documentation?
          </h1>

          <p className="text-gray-300 mt-5 text-lg max-w-3xl mx-auto">
            Contact Sanvi Business Consultancy today and let our experts
            handle your documentation needs.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="
              mt-10
              bg-amber-400
              hover:bg-amber-500
              text-slate-900
              px-10
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
              duration-300
              shadow-lg
              hover:scale-105
            "
          >
            Contact Us Now
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;