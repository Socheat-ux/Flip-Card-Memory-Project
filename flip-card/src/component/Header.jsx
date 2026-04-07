import { LogIn, LogOut, Settings, User } from "lucide-react";

function Header({ user, onLogout, onNavigate }) {
  return (
    <header className="site-header">
      <div className="header-logo" onClick={() => onNavigate("home")}>
        ⟨ Flip Cards ⟩
      </div>

      <div className="header-right">
        {user ? (
          <>
            <button className="hdr-btn">
              <User size={14} /> {user.username}
            </button>
            <button className="hdr-btn btn-logout" onClick={onLogout}>
              <LogOut size={14} /> Log Out
            </button>
          </>
        ) : (
          <button className="hdr-btn" onClick={() => onNavigate("login")}>
            <LogIn size={14} /> Log In
          </button>
        )}

        <button className="hdr-btn" onClick={() => onNavigate("settings")}>
          <Settings size={14} /> Settings
        </button>
      </div>
    </header>
  );

}

export default Header;