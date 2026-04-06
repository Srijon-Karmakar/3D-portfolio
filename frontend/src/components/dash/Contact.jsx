import React, { useState } from "react";
import "./Contact.css";
import { resumeContactCards } from "../../data/resumeData";
import { insertContactMessage } from "../../lib/supabaseContact";

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
      await insertContactMessage({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
      });

      setStatus({ type: "success", text: "Message sent successfully." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err?.message || "Failed to send." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-root">
      <h1 className="section-title">Contact</h1>
      <p className="section-text">
        Reach out through the CV contact details below or send a direct message from the dashboard.
      </p>

      <div className="contact-grid">
        {resumeContactCards.map((item) => (
          <div key={item.title} className="contact-card neumorphic-inset neumo-press">
            <h3>{item.title}</h3>
            <p>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.value}
              </a>
            </p>
          </div>
        ))}
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
