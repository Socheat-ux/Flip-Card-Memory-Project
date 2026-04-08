import { useState } from "react";

function SignUp({ onSignUp, onSwitch }) {

  const [error, setError] = useState("");

  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const update = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
  if (!form.username || !form.email || !form.password || !form.confirm) {
    setError("Please fill in all fields.");
    return;
  }
  if (form.password !== form.confirm) {
    setError("Passwords don't match!");
    return;
  }

  //JSON.parse(...) : use to convert string to JavaScript object 
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === form.email);
  if (exists) {
    setError("Email already exists!");
    return;
  }

  const newUser = {
    username: form.username,
    email: form.email,
    password: form.password,
  };

  //JSON.stringify(...) : use to convert JavaScript opject to string because
  //localStorage store data as a string in browser
  //Take old users → add new user → convert to string → save in browser
  localStorage.setItem("users", JSON.stringify([...users, newUser]));

  setError("");
  onSignUp(newUser);
};

  return (
    <div className="auth-card">
      <div className="auth-logo">Flip Card Memory</div>
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

      {error && <p className="auth-error">{error}</p>}
      <button className="btn-primary" onClick={handleSubmit}>Create Account</button>

      <p className="auth-switch">
        Already have an account? <span onClick={onSwitch}>Log in</span>
      </p>
    </div>
  );
}

export default SignUp;