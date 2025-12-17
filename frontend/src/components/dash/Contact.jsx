// src/components/sections/Contact.jsx
import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="section-root">
      <h1 className="section-title">Contact</h1>
      <p className="section-text">
        Let&apos;s connect. I&apos;m happy to collaborate, discuss ideas, or
        explore opportunities.
      </p>

      <div className="contact-grid  ">
        <div className="contact-card neumorphic-inset neumo-press">
          <h3>Email</h3>
          <p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              srijonkarmakar.dev@gmail.com
            </a>
          </p>
        </div>
        <div className="contact-card neumorphic-inset">
          <h3>LinkedIn</h3>
          <p>
            <a href="https://www.linkedin.com/in/srijon-karmakar/">srijon-karmakar</a>
          </p>
        </div>
        <div className="contact-card neumorphic-inset ">
          <h3>GitHub</h3>
          <p>
            <a href="https://github.com/Srijon-Karmakar">Srijon-Karmakar</a>
          </p>
        </div>
      </div>

      <form className="contact-form neumorphic-inset ">
        <div className="form-row">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
        </div>
        <textarea placeholder="Your message..." rows="3" />
        <button type="submit" id="sendmsg" className="primary-button ">
          Send Message
        </button>
      </form>
    </section>
  );
}
