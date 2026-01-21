import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={styles.backgroundVideo}
        >
          <source src="/some.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Foreground content */}
        <div style={styles.content}>
          <header style={styles.header}>
            <h2>🚀 NASA APOD Explorer</h2>
            <nav style={styles.nav}>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/gallery"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Gallery
              </NavLink>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  backgroundVideo: {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    zIndex: -1,
    objectFit: "cover",
  },
  content: {
    position: "relative",
    zIndex: 1,
    color: "white",
  },
  header: {
    textAlign: "center",
    padding: "16px",
    backgroundColor: "rgba(11, 61, 145, 0.7)", // semi-transparent
    color: "white",
    marginBottom: "20px",
    borderRadius: "8px",
  },
  nav: {
    marginTop: "10px",
  },
  link: {
    color: "white",
    margin: "0 15px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  activeLink: {
    color: "#ffdd57",
    margin: "0 15px",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default App;
