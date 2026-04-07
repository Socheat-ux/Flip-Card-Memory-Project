import { useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";

function Header({ user, onLogout, onNavigate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="site-header">
      <div className="header-logo" onClick={() => onNavigate("home")}>
        ⟨ Flip Cards ⟩
      </div>

      <div className="header-right">
        {user ? (
          <div className="profile-wrapper">
            <button className="hdr-btn" onClick={() => setShowDropdown(p => !p)}>
              <User size={14} /> {user.username}
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                <div className="profile-top">
                  <div className="profile-avatar">{user.username.slice(0, 2).toUpperCase()}</div>
                  <span className="profile-name">{user.username}</span>
                </div>
                <hr className="profile-divider" />
                <button className="dropdown-item logout-item" onClick={() => { onLogout(); setShowDropdown(false); }}>
                  <LogOut size={15} /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="hdr-btn" onClick={() => onNavigate("login")}>
            <LogIn size={14} /> Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;