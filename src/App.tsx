import React, { useState } from "react";
import "./App.css";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { login } from "./services/auth"; // 👈 importar login

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      console.log("Respuesta del backend:", result);
      alert(JSON.stringify(result)); // 👈 muestra la respuesta en un alert
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Título */}
        <h2 className="login-title">Account Log In</h2>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username/Email"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 👈 conectar estado
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 👈 conectar estado
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        {/* Enlaces inferiores */}
        <div className="login-links">
          <a href="#">Having Problems?</a>
          <a href="#">Register Now</a>
        </div>

        {/* Otros métodos de inicio */}
        <div className="login-alt-section">
          <p className="login-alt-text">More Login Methods</p>
          <div className="login-alt-buttons">
            <button className="alt-button"><FaGoogle /></button>
            <button className="alt-button"><FaApple /></button>
            <button className="alt-button"><FaFacebookF /></button>
            <button className="alt-button"><FaXTwitter /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
