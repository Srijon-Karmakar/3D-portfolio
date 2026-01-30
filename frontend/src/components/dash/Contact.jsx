// // src/components/sections/Contact.jsx
// import React from "react";
// import "./Contact.css";

// export default function Contact() {
//   return (
//     <section className="section-root">
//       <h1 className="section-title">Contact</h1>
//       <p className="section-text">
//         Let&apos;s connect. I&apos;m happy to collaborate, discuss ideas, or
//         explore opportunities.
//       </p>

//       <div className="contact-grid  ">
//         <div className="contact-card neumorphic-inset neumo-press">
//           <h3>Email</h3>
//           <p>
//             <a
//               href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               srijonkarmakar.dev@gmail.com
//             </a>
//           </p>
//         </div>
//         <div className="contact-card neumorphic-inset">
//           <h3>LinkedIn</h3>
//           <p>
//             <a href="https://www.linkedin.com/in/srijon-karmakar/">srijon-karmakar</a>
//           </p>
//         </div>
//         <div className="contact-card neumorphic-inset ">
//           <h3>GitHub</h3>
//           <p>
//             <a href="https://github.com/Srijon-Karmakar">Srijon-Karmakar</a>
//           </p>
//         </div>
//       </div>

//       <form className="contact-form neumorphic-inset ">
//         <div className="form-row">
//           <input type="text" placeholder="Your Name" />
//           <input type="email" placeholder="Your Email" />
//         </div>
//         <textarea placeholder="Your message..." rows="3" />
//         <button type="submit" id="sendmsg" className="primary-button ">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// }








// src/components/sections/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({ type: "error", text: data?.message || "Failed to send." });
        return;
      }

      setStatus({ type: "success", text: "Message sent! Check your email ✅" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-root">
      <h1 className="section-title">Contact</h1>
      <p className="section-text">
        Let&apos;s connect. I&apos;m happy to collaborate, discuss ideas, or explore opportunities.
      </p>

      <div className="contact-grid">
        {/* your cards unchanged */}
      </div>

      <form className="contact-form neumorphic-inset" onSubmit={onSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </div>

        <textarea
          placeholder="Your message..."
          rows="3"
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
        />

        {status.text ? (
          <p style={{ marginTop: 10, fontSize: 13, color: status.type === "error" ? "#b91c1c" : "#166534" }}>
            {status.text}
          </p>
        ) : null}

        <button type="submit" id="sendmsg" className="primary-button" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

