import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = "2107100e-e57c-46a9-a9c1-ad480524795f";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 32,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        x: -40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        x: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_KEY);
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("service", formData.service);
    payload.append("message", formData.message);
    payload.append("subject", "New Contact Inquiry — Off White Design");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-28 bg-gradient-to-b from-[#8F3F1F] to-[#6E2F17] overflow-hidden"
      >
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-6">
          {/* TITLE */}
          <div ref={titleRef} className="text-center mb-14">
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/70 mb-2">
              The Quiet Connection
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white">
              Get in Touch
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-white/70 text-sm">
              Connect with our hospitality interior design studio in India to
              discuss restaurant, café, and boutique hospitality projects
              crafted with intention.
            </p>
            <div className="mt-6 h-px w-24 mx-auto bg-white/40" />
          </div>

          {/* GLASS CARD */}
          <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 p-12 md:p-16">
              {/* INFO */}
              <div ref={infoRef} className="text-white space-y-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-2">
                    Email
                  </p>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 opacity-80" />
                    info@offwhitedesign.in
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-2">
                    Phone
                  </p>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 opacity-80" />
                    +91 97737 12348
                  </div>
                </div>

                {/* UPDATED ADDRESS */}
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-2">
                    The Studio
                  </p>
                  <div className="flex gap-4 leading-relaxed">
                    <MapPin className="w-5 h-5 opacity-80 mt-0.5" />
                    <span className="text-white/90 text-sm">
                      9B-466, Shivali CHS,
                      <br />
                      Sardar Nagar No.1, Sion,
                      <br />
                      Mumbai 400022
                    </span>
                  </div>
                </div>
              </div>

              {/* FORM — UNCHANGED */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-9">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-transparent border-b border-white/40 text-white py-3.5"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-white/40 text-white py-3.5"
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white py-3.5"
                >
                  <option value="" className="bg-[#984421]">
                    Select Your Path
                  </option>
                  <option value="hospitality">
                    Hospitality Interior Design
                  </option>
                  <option value="workplace">Workplace Interior Design</option>
                  <option value="residential">
                    Residential Interior Design
                  </option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell Us About Your Vision"
                  className="w-full bg-transparent border-b border-white/40 text-white py-3.5 resize-none"
                />

                {error && <p className="text-red-300 text-xs">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-white py-4 text-white uppercase tracking-[0.38em]
                  hover:bg-white hover:text-[#8F3F1F] transition"
                >
                  {loading ? "Sending..." : "Initiate Dialogue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL — UNCHANGED */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="relative w-[92%] max-w-lg bg-white px-10 py-14 text-center shadow-[0_60px_160px_rgba(0,0,0,0.35)]">
            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-5 right-5 text-black/40 hover:text-black transition"
            >
              <X size={18} />
            </button>

            <div className="mx-auto mb-8 h-px w-24 bg-[#8F3F1F]" />

            <h3 className="text-2xl font-extralight tracking-wide mb-6">
              Thank You for Contacting Off White Design
            </h3>

            <p className="text-sm text-black/70 leading-relaxed max-w-md mx-auto mb-10">
              Your inquiry is now with our design team. We handle every project
              with meticulous care, starting from this very moment. Expect a
              personal response from our studio shortly.
            </p>

            <p className="text-xs tracking-[0.25em] uppercase text-black/60">
              Off White Design
            </p>
            <p className="mt-2 text-[11px] text-black/50">
              Thoughtful Aesthetics. Purposeful Functionality.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-10 px-10 py-3 border border-black/30 text-xs tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
