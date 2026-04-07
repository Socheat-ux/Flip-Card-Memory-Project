import { useState } from "react";

function SignUp({ onSignUp, onSwitch }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const update = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (form.password !== form.confirm) return alert("Passwords don't match!");
    onSignUp({ username: form.username, email: form.email });
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">SIGN IN</div>
      <h2>Create Account</h2>
      <p className="auth-sub">Join the memory challenge</p>

      <div className="form-group">
        <label>USERNAME</label>
        <input type="text" placeholder="FlipMaster99" value={form.username} onChange={update("username")} />
      </div>
      <div className="form-group">
        <label>EMAIL</label>
        <input type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
      </div>
      <div className="form-group">
        <label>PASSWORD</label>
        <input type="password" placeholder="••••••••" value={form.password} onChange={update("password")} />
        <p className="password-hint">At least 8 characters</p>
      </div>
      <div className="form-group">
        <label>CONFIRM PASSWORD</label>
        <input type="password" placeholder="••••••••" value={form.confirm} onChange={update("confirm")} />
      </div>

      <button className="btn-primary" onClick={handleSubmit}>Create Account</button>

      <p className="auth-switch">
        Already have an account? <span onClick={onSwitch}>Log in</span>
      </p>
    </div>
  );
}

export default SignUp;