import "../../css/Authin.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import { newPasswordAPI } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logout_oth_dev, setLogout_oth_dev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (password !== password_confirmation) {
      setError("كلمتا السر غير متطابقتين");
      setLoading(false);
      return;
    }

    try {
      await newPasswordAPI(
        password,
        password_confirmation,
        logout_oth_dev,
        token
      );
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ ما أعد كتابة كلمة السر الجديدة";
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
      <div className="new-password">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h1>Enter Your New Password</h1>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                className="material-icons"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </i>
            </div>

            <h1>Confirm Password</h1>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={password_confirmation}
                onChange={(e) => {
                  setPassword_confirmation(e.target.value);
                }}
              />
              <i
                className="material-icons"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </i>
            </div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={logout_oth_dev}
                onChange={() => setLogout_oth_dev(!logout_oth_dev)}
              />
              Delete from all devices
            </label>

            <div className="btn">
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
                  "save"
                )}
              </button>
            </div>
          </form>
          {error && (
            <div className="error-message" role="alert">
              ‼️ {error} ‼️
            </div>
          )}
          <div className="link">
            <Link to="/verfy-email" className="links">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
