import { useState } from "react";
import { motion } from "framer-motion";
import { useSectionAnimation } from "../hooks/useSectionAnimation";
import {
  FiSend,
  FiCheck,
  FiLoader,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const { ref, inView } = useSectionAnimation(0.1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const baseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const apiUri = `${baseUrl}/contact`;
      console.log("📤 Sending to:", apiUri);
      const response = await axios.post(apiUri, formData);
      console.log("✅ Response:", response.data);
      setSubmittedName(formData.name);
      setStatus("sent");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("❌ Error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
      toast.error(
        error.response?.data?.error || "Failed to send. Please try again.",
      );
      setStatus("idle");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white font-dmSans placeholder-gray-600 focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all duration-300";

  return (
    <section
      id="contact"
      className="py-20 bg-[#080c1a] relative overflow-hidden px-4"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-accent/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-accent/20 to-secondary/20 border border-white/10 flex items-center justify-center mx-auto mb-6"
          >
            <FiMessageCircle className="text-accent text-2xl" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black font-syne tracking-tight mb-3">
            Say Hello<span className="text-accent">.</span>
          </h2>
          <p className="text-gray-500 text-sm font-dmSans max-w-md mx-auto">
            Have a project idea, a question, or just want to connect? Fill out
            the form below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 text-center backdrop-blur-md relative overflow-hidden"
          >
            {/* Glowing gradient backdrops */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-accent/[0.05] rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-secondary/[0.05] rounded-full blur-[80px]" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6 text-green-400 text-3xl shadow-lg shadow-green-500/10"
            >
              <FiCheck />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-black font-syne tracking-tight mb-4 text-white">
              Thank you,{" "}
              <span className="text-accent">{submittedName || "there"}</span>!
            </h3>

            <p className="text-gray-400 font-dmSans text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
              Your message has been safely received. I appreciate you taking the
              time to connect, and I will get back to you within 24 hours.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStatus("idle")}
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-background font-syne font-black text-xs uppercase tracking-[0.25em] rounded-2xl inline-flex items-center gap-2 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className={inputClass}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className={inputClass}
                />
              </motion.div>
            </div>

            {/* Row 2: Subject */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className={inputClass}
              />
            </motion.div>

            {/* Row 3: Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Your Message..."
                className={`${inputClass} resize-none`}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full py-5 bg-gradient-to-r from-accent to-accent/80 text-background font-syne font-black text-xs uppercase tracking-[0.25em] rounded-2xl flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "idle" && (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
                {status === "sending" && (
                  <>
                    <FiLoader className="animate-spin" /> Sending...
                  </>
                )}
                {status === "sent" && (
                  <>
                    <FiCheck /> Message Sent!
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        )}

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10 text-gray-600 text-xs"
        >
          <div className="flex items-center gap-2">
            <FiMail className="text-accent/50" />
            <span>Email: </span>
            <a
              href="mailto:ashiqueoffl7@gmail.com"
              className="text-accent hover:underline font-bold"
            >
              ashiqueoffl7@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent/50">📞</span>
            <span>Phone: </span>
            <a
              href="tel:+917902857903"
              className="text-accent hover:underline font-bold"
            >
              +91 7902 857 903
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
