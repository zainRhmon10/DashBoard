import { useState } from "react";
import "../../css/Authin.css";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("أرجوك ضع ايميل صحيح");
      setLoading(false); 
      return;
    }

    try {
      const res = await loginApi(email, password);
      const token = res.data.token;

      if (typeof token === "string" && token.length > 30) {
        login(token);
        navigate("/dashboard");
      } else {
        setError("خطأ من السيرفر أعد المحاولة");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "فشل تسجيل الدخول أعد المحاولة .";
      setError(errorMessage);

      console.error("Login Error:", {
        error: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-page-auth">
      <div className="log-in">
        <div className="side-left">
          <h1>Welcome back </h1>
          <Link to="/reset-password" className="links">
            reset password
          </Link>
        </div>

        <div className="side-right">
          <h1>Login</h1>
          {error && (
            <div className="error-message" role="alert">
              ‼️ {error} ‼️
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <i className="material-icons">
                <Email />
              </i>
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                className="material-icons ch-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </i>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className={loading ? "loading-state" : ""}
            >
              {loading ? (
                <div className="loader-container">
                  <span className="spinner"></span>
                  Loading...
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
