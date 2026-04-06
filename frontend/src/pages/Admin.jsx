import { useEffect, useMemo, useState } from "react";
import {
  fetchAdminContacts,
  refreshAdminSession,
  signInAdmin,
  signOutAdmin,
} from "../lib/supabaseAdmin";
import "./Admin.css";

const SESSION_KEY = "supabase-admin-session";

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
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [session, setSession] = useState(() => readStoredSession());
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const accessToken = session?.access_token || "";
  const refreshToken = session?.refresh_token || "";
  const adminEmail = session?.user?.email || "";

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
      if (refreshToken) {
        try {
          const refreshed = await refreshAdminSession(refreshToken);
          setSession(refreshed);
          writeStoredSession(refreshed);
          const rows = await fetchAdminContacts(refreshed.access_token);
          setContacts(rows);
          setMessage({ type: "", text: "" });
          return;
        } catch {
          setSession(null);
          writeStoredSession(null);
        }
      }

      setMessage({ type: "error", text: error?.message || "Failed to load contacts." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    loadContacts(accessToken);
  }, [accessToken]);

  const onChangeCredential = (key, value) => {
    setCredentials((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setMessage({ type: "error", text: "Enter your Supabase admin email and password." });
      return;
    }

    setAuthLoading(true);
    try {
      const data = await signInAdmin(credentials.email.trim(), credentials.password);
      setSession(data);
      writeStoredSession(data);
      setCredentials((current) => ({ ...current, password: "" }));
      setMessage({ type: "success", text: "Signed in successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error?.message || "Admin sign-in failed." });
    } finally {
      setAuthLoading(false);
    }
  };

  const onSignOut = async () => {
    try {
      if (accessToken) {
        await signOutAdmin(accessToken);
      }
    } catch {
      // Ignore logout network errors and clear local state anyway.
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
              Sign in with a Supabase user account to review contact submissions from the portfolio form.
            </p>
          </div>

          {session ? (
            <div className="admin-toolbar">
              <div className="admin-chip">
                <span>Signed in as</span>
                <strong>{adminEmail}</strong>
              </div>
              <button type="button" className="admin-button admin-button-secondary" onClick={() => loadContacts(accessToken)}>
                Refresh
              </button>
              <button type="button" className="admin-button" onClick={onSignOut}>
                Sign out
              </button>
            </div>
          ) : null}
        </header>

        {message.text ? (
          <p className={`admin-status admin-status-${message.type || "neutral"}`}>{message.text}</p>
        ) : null}

        {!session ? (
          <section className="admin-auth-card">
            <form className="admin-auth-form" onSubmit={onSubmit}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={(event) => onChangeCredential("email", event.target.value)}
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(event) => onChangeCredential("password", event.target.value)}
                />
              </label>

              <button type="submit" className="admin-button" disabled={authLoading}>
                {authLoading ? "Signing in..." : "Sign in"}
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
                        <span className={`admin-status-pill admin-status-pill-${item.status || "new"}`}>
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
                      <span className="admin-user-agent">{item.user_agent || "No user agent captured"}</span>
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
