// frontend/src/facades/AuthFacade.ts
export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export class AuthFacade {
  private baseUrl = "http://localhost:3000/auth";

  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { success: false, message: "No se pudo conectar con el backend" };
    }
  }

  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    if (data.password !== data.confirmPassword) {
      return { success: false, message: "Las contraseñas no coinciden ❌" };
    }

    try {
      const res = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });
      return await res.json();
    } catch {
      return { success: false, message: "No se pudo conectar con el backend" };
    }
  }

  // Modo oscuro / claro
  toggleDarkMode(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }

  // OAuth simulado
  oauthLogin(platform: string): void {
    let authUrl = "";
    switch (platform) {
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
  }
}
