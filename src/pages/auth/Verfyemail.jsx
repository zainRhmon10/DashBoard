import "../../css/Authin.css";
import verImage from "../../assets/images/Confirmed-bro.png";
import { Link } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { verifyOtpApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Verfyemail = () => {
  const { email, delEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [finalOTP, setFinalOTP] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleOTPChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);
    const combineOTP = newOTP.join("");

    if (combineOTP.length === 6) {
      setFinalOTP(combineOTP);
    }

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleOTPClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await verifyOtpApi(email, finalOTP);
      delEmail();
      navigate("/new-password");
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
      <div className="verfyemail">
        <div className="image">
          <img src={verImage} alt="verfy image" />
        </div>
        <div className="formContainer">
          {error && (
            <div className="error-message" role="alert">
              ‼️ {error} ‼️
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h2>enter verfication number</h2>
            <div className="OTP">
              {otp.map((value, index) => {
                return (
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Digit ${index + 1}`}
                    key={index}
                    type="text"
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => {
                      handleOTPChange(index, e);
                    }}
                    onClick={() => {
                      handleOTPClick(index);
                    }}
                    onKeyDown={(e) => {
                      handleKeyDown(index, e);
                    }}
                    className="otp-input"
                  />
                );
              })}
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
                "Verfy"
              )}
            </button>
          </form>
        </div>
        <Link className="links" to="/new-password">
          back
        </Link>
      </div>
    </div>
  );
};

export default Verfyemail;
