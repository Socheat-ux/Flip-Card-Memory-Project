import { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    onLogin({ username: email.split("@")[0], email });
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">⟨ FC ⟩</div>
      <h2>Welcome Back</h2>
      <p className="auth-sub">Log in to continue playing</p>

      <div className="form-group">
        <label>EMAIL</label>
        <input type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>PASSWORD</label>
        <input type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button className="btn-primary" onClick={handleSubmit}>Log In</button>

      <p className="auth-switch">
        Don't have an account? <span onClick={onSwitch}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;