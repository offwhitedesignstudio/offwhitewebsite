import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const FloatingSocials = () => {
  const phoneNumber = "+9197737 12348";
  const message = "Hello! I would like to discuss a project.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  const instagramLink = "https://www.instagram.com/offwhitedesign.in/";

  return (
    <div
      className="
        fixed bottom-6 right-6 z-[9999]
        flex flex-col gap-4
      "
    >
      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          w-16 h-16
          rounded-full
          bg-[#25D366]
          flex items-center justify-center
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.45)]
          transition-all duration-300
        "
      >
        <FaWhatsapp size={34} color="white" />
      </a>

      {/* Instagram */}
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Instagram"
        className="
          w-16 h-16
          rounded-full
          bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]
          flex items-center justify-center
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.45)]
          transition-all duration-300
        "
      >
        <FaInstagram size={32} color="white" />
      </a>
    </div>
  );
};

export default FloatingSocials;
