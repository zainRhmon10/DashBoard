import { Link } from "react-router-dom";
import Email from "@mui/icons-material/Email";
import { useContext, useState } from "react";
import { enterEmailAPi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {newEmail} = useContext(AuthContext);

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
      await enterEmailAPi(email);
      navigate("/verfy-email");
      newEmail(email);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "استخدم حساب صحيح";
      setError(errorMessage);

      console.error("reset-password Error:", {
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
      <div className="reset-password">
        <div className="h-text">
          <h1>Forget Password ?</h1>
          <h3>Enter your email to reset your password</h3>
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <i className="material-icons">
              <Email />
            </i>

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className={loading ? "loading-state" : "btn"}
            >
              {loading ? (
                <div className="loader-container">
                  <span className="spinner"></span>
                  Loading...
                </div>
              ) : (
                "submit email"
              )}
            </button>
          </form>
        </div>

        <div className="btn">
          <Link to="/login" className="links">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
