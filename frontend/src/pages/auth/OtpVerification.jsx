import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaInstagram } from "react-icons/fa";
import "../../OtpVerification.css";
import { useDispatch, useSelector } from "react-redux";
import { userReset, verifyOTP } from "../../redux/user/usersSlice";

const OtpVerification = () => {
  const { my_otp } = useParams();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const { userloading, usersuccess, usermessage, user } = useSelector(
    (state) => state.auth
  );

  // ✅ Email nikaalne ka reliable tareeqa
  const [email, setEmail] = useState("");
  useEffect(() => {
    const urlEmail = new URLSearchParams(window.location.search).get("email");
    const storedEmail = localStorage.getItem("signup_email");
    const reduxEmail = user?.data?.m_mail || user?.m_mail;
    const finalEmail = urlEmail || storedEmail || reduxEmail || "";
    setEmail(finalEmail);
    console.log("🔍 OTP page email:", finalEmail);
  }, [user]);

  // Prefill OTP from URL param
  useEffect(() => {
    if (my_otp && /^\d{6}$/.test(my_otp)) {
      setOtp(my_otp.split(""));
      inputRefs.current[5]?.focus();
    }
  }, [my_otp]);
 const navigate = useNavigate()
  // ✅ Redux se success/error handle karo
  useEffect(() => {
    if (usersuccess) {
      setMessage(usermessage || "Email verified successfully!");
      setMessageType("success");
       navigate('/home')
       dispatch(userReset())
    }
  }, [usersuccess, usermessage]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    setMessage("");

    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      const updatedOtp = ["", "", "", "", "", ""];
      digits.forEach((digit, i) => {
        updatedOtp[i] = digit;
      });
      setOtp(updatedOtp);
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ✅ FIXED handleVerify
  const handleVerify = (e) => {
    e.preventDefault();                              // ✅ reload rok

    if (userloading) return;                         // ✅ sahi flag

    const otpCode = otp.join("");                    // ✅ string banao
    if (otpCode.length !== 6) {
      setMessage("Please enter the complete 6-digit OTP.");
      setMessageType("error");
      return;
    }

    if (!email) {
      setMessage("Email missing. Please sign up again.");
      setMessageType("error");
      return;
    }

    console.log("🔍 Sending:", { m_mail: email, otp: otpCode });

    dispatch(verifyOTP({
      m_mail: email,                                 // ✅ string email
      otp: otpCode,                                  // ✅ string otp
    }));
  };

  // ✅ FIXED handleResend
  const handleResend = async () => {
    setMessage("");

    if (!email) {
      setMessage("Email missing. Please sign up again.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5174/api/user/resend-otp",
        { m_mail: email }                            // ✅ m_mail
      );
      setOtp(["", "", "", "", "", ""]);
      setMessage(response.data.message || "A new OTP has been sent.");
      setMessageType("success");
      inputRefs.current[0]?.focus();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to resend OTP."
      );
      setMessageType("error");
    }
  };
  // Handle paste event
const handlePaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
  const digits = pastedData.slice(0, digitCount).split("");

  if (digits.length === 0) return;

  const newOtp = [...otp];
  digits.forEach((digit, idx) => {
    if (idx < digitCount) {
      newOtp[idx] = digit;
    }
  });

  setOtp(newOtp);
  setInternalError("");
  setInternalSuccess("");

  // Focus the last filled or next empty input
  const lastFilledIndex = Math.min(digits.length, digitCount - 1);
  const nextEmptyIndex = newOtp.findIndex((d) => d === "");
  const focusIndex = nextEmptyIndex === -1 ? lastFilledIndex : nextEmptyIndex;
  setActiveIndex(focusIndex);
  inputRefs.current[focusIndex]?.focus();
};

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-logo">
          <FaInstagram />
        </div>

        <div className="otp-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            width="34"
            height="34"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </div>

        <h1>Verify Your Email</h1>
        <p className="otp-description">
          We have sent a 6-digit verification code to your email ({email || "—"}).
          Enter the code below to verify your account.
        </p>

        <form onSubmit={handleVerify}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {message && (
            <p className={`otp-message ${messageType}`} role="status">
              {message}
            </p>
          )}

          <button
            className="otp-verify-btn"
            type="submit"
            disabled={userloading}
          >
            {userloading ? "Please wait..." : "Verify OTP"}
          </button>
        </form>

        <div className="otp-resend">
          <p>Didn't receive the code?</p>
          <button type="button" onClick={handleResend} disabled={userloading}>
            Resend OTP
          </button>
        </div>

        <p className="otp-expiry">
          Your verification code expires in 10 minutes.
        </p>
      </div>

      <footer className="otp-footer">
        Instagram · Secure Email Verification
      </footer>
    </div>
  );
};

export default OtpVerification;