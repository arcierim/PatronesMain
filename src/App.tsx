import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGoogle, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthFacade } from "./Facade/AuthFacade";
import type { LoginData, RegisterData } from "./Facade/AuthFacade";

import "./App.css";

const authFacade = new AuthFacade();

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    authFacade.toggleDarkMode(darkMode);
  }, [darkMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await authFacade.login({ username, password } as LoginData);
    setLoginMessage(
      response.success
        ? "Has iniciado sesión correctamente"
        : response.message || "Credenciales inválidas"
    );
    setShowModal(true);

    if (response.success) {
      setTimeout(() => {
        window.location.href =
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
      }, 3000);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await authFacade.register(registerData);
    setLoginMessage(
      response.success ? "Registro exitoso" : response.message || "Error al registrar"
    );
    setShowModal(true);

    if (response.success) {
      setShowRegister(false);
      setRegisterData({ username: "", password: "", confirmPassword: "" });
    }
  };

  const handleAltLogin = (platform: string) => {
    let authUrl = "";
    switch (platform) {
      case "Google":
        authUrl =
          "https://accounts.google.com/o/oauth2/v2/auth?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&response_type=code&scope=openid%20email%20profile";
        break;
      case "X (Twitter)":
        authUrl =
          "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain";
        break;
      case "LinkedIn":
        authUrl =
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress";
        break;
      case "Instagram":
        authUrl =
          "https://api.instagram.com/oauth/authorize?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&scope=user_profile,user_media&response_type=code";
        break;
      default:
        return;
    }
    window.open(authUrl, "_blank", "width=600,height=700");
  };

  return (
    <div className="login-container">
      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {!showRegister ? (
        <div className="login-card">
          <h2 className="login-title">Account Log In</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

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

          <button className="register-now-button" onClick={() => setShowRegister(true)}>
            Register Now
          </button>
        </div>
      ) : (
        <div className="login-card">
          <h2 className="login-title">Register</h2>
          <form className="login-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              className="login-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({ ...registerData, confirmPassword: e.target.value })
              }
              className="login-input"
            />
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
          <button onClick={() => setShowRegister(false)}>Back to Login</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <p>{loginMessage}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
