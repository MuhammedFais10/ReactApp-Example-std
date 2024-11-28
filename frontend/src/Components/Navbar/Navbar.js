import { useAuthContext } from "../hooks/AuthProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuthContext(); // Assuming a context provides `user`
  console.log("Navbar user::", user);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-5">
          <Link
            className="navbar-brand"
            to="/"
            style={{ textDecoration: "none" }}
          >
            Navbar
          </Link>
          <div
            className="d-flex justify-content-start"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {user ? (
                  <>
                    <span className="nav-link">Welcome, {user.name}</span>
                    <button
                      className="btn btn-link nav-link"
                      onClick={logout}
                      style={{ textDecoration: "none" }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
