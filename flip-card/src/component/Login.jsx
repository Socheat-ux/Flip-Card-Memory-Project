import { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <button className="btn-primary" onClick={() => onLogin({ username: email.split("@")[0], email })}>
        Log In
      </button>

      <p className="auth-switch">
        Don't have an account? <span onClick={onSwitch}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;