import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9380401950"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl z-50 hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;