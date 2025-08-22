import React, { useState, useEffect } from "react";
import "./App.css";
import { FaGoogle, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSun, FaMoon } from "react-icons/fa";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username =
      (document.querySelector<HTMLInputElement>(
        'input[placeholder="Username/Email"]'
      )?.value) || "";
    const password =
      (document.querySelector<HTMLInputElement>(
        'input[placeholder="Password"]'
      )?.value) || "";

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLoginMessage("Se ha iniciado correctamente 🎉");
        } else {
          setLoginMessage("Usuario o contraseña incorrectos ❌");
        }
        setShowModal(true);
      } else {
        setLoginMessage("Error de conexión con el servidor");
        setShowModal(true);
      }
    } catch (err) {
      setLoginMessage("No se pudo conectar con el backend");
      setShowModal(true);
    }
  };

  // Manejo de botones de verificación externa (solo abren ventana OAuth)
  const handleAltLogin = (platform: string) => {
    let authUrl = "";

    switch(platform) {
      case "Google":
        authUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&response_type=code&scope=openid%20email%20profile";
        break;
      case "X (Twitter)":
        authUrl = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain";
        break;
      case "LinkedIn":
        authUrl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress";
        break;
      case "Instagram":
        authUrl = "https://api.instagram.com/oauth/authorize?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=user_profile,user_media&response_type=code";
        break;
      default:
        return;
    }

    window.open(authUrl, "_blank", "width=600,height=700");
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = () => {
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Las contraseñas no coinciden ❌");
      return;
    }
    setRegisterError("");
    setLoginMessage("Registro simulado exitoso 🎉");
    setShowModal(true);
    setShowRegister(false);
    setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="login-container">
      {/* Botón modo oscuro/claro */}
      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Card de login */}
      <div className="login-card">
        <h2 className="login-title">Account Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username/Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Log In</button>
        </form>

        <div className="login-links">
          <a href="#">Forgot your Password?</a>
          <a href="#" onClick={() => setShowRegister(true)}>Register Now</a>
        </div>

        <div className="login-alt-section">
          <p className="login-alt-text">More Login Methods</p>
          <div className="login-alt-buttons">
            <button className="alt-button" onClick={() => handleAltLogin("Google")}>
              <FaGoogle />
            </button>
            <button className="alt-button" onClick={() => handleAltLogin("X (Twitter)")}>
              <FaXTwitter />
            </button>
            <button className="alt-button" onClick={() => handleAltLogin("LinkedIn")}>
              <FaLinkedin />
            </button>
            <button className="alt-button" onClick={() => handleAltLogin("Instagram")}>
              <FaInstagram />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de login */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <p>{loginMessage}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de registro */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className={`modal-card ${darkMode ? "dark-mode" : "light-mode"}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="login-title">Register</h3>
            <form
              className="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegisterSubmit();
              }}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
                className="register-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="register-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="register-input"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className="register-input"
              />
              {registerError && <div className="error-message">{registerError}</div>}
              <button type="submit" className="register-button">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
