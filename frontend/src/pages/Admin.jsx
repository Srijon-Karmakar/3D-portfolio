import { useEffect, useMemo, useState } from "react";
import {
  fetchAdminContacts,
  signInAdmin,
  signOutAdmin,
} from "../lib/supabaseAdmin";
import "./Admin.css";

const SESSION_KEY = "portfolio-admin-session";

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function Admin() {
  const [accessKey, setAccessKey] = useState("");
  const [session, setSession] = useState(() => readStoredSession());
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const sessionToken = session?.token || "";
  const expiresAt = session?.expires_at || "";

  const summary = useMemo(() => {
    const unread = contacts.filter((item) => item.status === "new").length;
    return {
      total: contacts.length,
      unread,
    };
  }, [contacts]);

  const loadContacts = async (token) => {
    setLoading(true);
    try {
      const rows = await fetchAdminContacts(token);
      setContacts(rows);
      setMessage({ type: "", text: "" });
    } catch (error) {
      setSession(null);
      writeStoredSession(null);
      setMessage({
        type: "error",
        text: error?.message || "Failed to load contacts.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionToken) {
      return;
    }

    loadContacts(sessionToken);
  }, [sessionToken]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!accessKey.trim()) {
      setMessage({ type: "error", text: "Enter the admin access key." });
      return;
    }

    setAuthLoading(true);
    try {
      const data = await signInAdmin(accessKey.trim());
      setSession(data);
      writeStoredSession(data);
      setAccessKey("");
      setMessage({ type: "success", text: "Access granted." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.message || "Admin access denied.",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const onSignOut = async () => {
    try {
      await signOutAdmin();
    } catch {
      // Ignore local sign-out cleanup errors.
    }

    setSession(null);
    setContacts([]);
    writeStoredSession(null);
    setMessage({ type: "", text: "" });
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">Admin</p>
            <h1>Contact inbox</h1>
            <p className="admin-copy">
              Enter the admin access key to review contact submissions from the
              portfolio form.
            </p>
          </div>

          {session ? (
            <div className="admin-toolbar">
              <div className="admin-chip">
                <span>Access valid until</span>
                <strong>{formatDate(expiresAt)}</strong>
              </div>
              <button
                type="button"
                className="admin-button admin-button-secondary"
                onClick={() => loadContacts(sessionToken)}
              >
                Refresh
              </button>
              <button
                type="button"
                className="admin-button"
                onClick={onSignOut}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </header>

        {message.text ? (
          <p className={`admin-status admin-status-${message.type || "neutral"}`}>
            {message.text}
          </p>
        ) : null}

        {!session ? (
          <section className="admin-auth-card">
            <form className="admin-auth-form" onSubmit={onSubmit}>
              <label>
                <span>Access key</span>
                <input
                  type="password"
                  placeholder="Enter admin key"
                  value={accessKey}
                  onChange={(event) => setAccessKey(event.target.value)}
                />
              </label>

              <button
                type="submit"
                className="admin-button"
                disabled={authLoading}
              >
                {authLoading ? "Checking..." : "Open dashboard"}
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="admin-summary">
              <article className="admin-summary-card">
                <span>Total messages</span>
                <strong>{summary.total}</strong>
              </article>
              <article className="admin-summary-card">
                <span>Unread / new</span>
                <strong>{summary.unread}</strong>
              </article>
            </section>

            <section className="admin-list">
              {loading ? <p className="admin-empty">Loading contacts...</p> : null}

              {!loading && contacts.length === 0 ? (
                <p className="admin-empty">No contact submissions found yet.</p>
              ) : null}

              {!loading &&
                contacts.map((item) => (
                  <article className="admin-contact-card" key={item.id}>
                    <div className="admin-contact-top">
                      <div>
                        <h2>{item.name}</h2>
                        <p>{item.email}</p>
                      </div>
                      <div className="admin-contact-meta">
                        <span
                          className={`admin-status-pill admin-status-pill-${
                            item.status || "new"
                          }`}
                        >
                          {item.status || "new"}
                        </span>
                        <time>{formatDate(item.created_at)}</time>
                      </div>
                    </div>

                    <p className="admin-contact-message">{item.message}</p>

                    <div className="admin-contact-actions">
                      <a className="admin-link" href={`mailto:${item.email}`}>
                        Email
                      </a>
                      <span className="admin-user-agent">
                        {item.user_agent || "No user agent captured"}
                      </span>
                    </div>
                  </article>
                ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
