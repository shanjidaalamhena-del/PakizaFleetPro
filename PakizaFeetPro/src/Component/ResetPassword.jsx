
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ email = "sha******@gmail.com" }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const refs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1); // sudhu digit
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 4) refs.current[index + 1]?.focus(); // auto next box
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus(); // backspace e ager box e
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!text) return;
    const newOtp = [...otp];
    text.split("").forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    refs.current[Math.min(text.length, 4)]?.focus();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("OTP submitted:", otp.join(""));
  //   navigate("/new-reset-password");
  // };


const handleSubmit = (e) => {
  e.preventDefault();

  const otpCode = otp.join("");

  if (otpCode.length !== 5) {
    alert("Please enter the 5-digit OTP");
    return;
  }

  console.log("OTP:", otpCode);

  navigate("/new-reset-password", {
    state: {
      otp: otpCode,
    },
  });
};


  const handleResend = () => {
    console.log("Code resent to:", email);
    // resend API ekhane
  };

  return (
    
    
    <div
      className="w-[440px]  h-[320px] bg-white rounded-lg
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4
                 flex flex-col gap-4 ">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[22px] leading-7 font-bold text-gray-900">
          Password Reset
        </h2>
        <p className="text-[15px] leading-6 text-gray-500">
          We've sent an OTP with a code to your
          <br />
          email <span className="text-blue-600">{email}</span>
        </p>
      </div>

      {/* OTP + Continue */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (refs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className=" w-15 h-13  bg-white border border-gray-200 rounded-lg 
                         text-center text-lg font-medium text-gray-900
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-100 transition"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full h-10 bg-blue-600 hover:bg-blue-700
                     text-white text-sm font-semibold rounded-md transition-colors"
        >
          Continue
        </button>
      </form> 

      {/* Resend */}
      <p className="text-center text-[15px] leading-5 text-gray-500">
        I didn't receive a code{" "}
        <button
          type="button"
          onClick={handleResend}
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          Resend
        </button>
      </p>

      {/* Back to log-in */}
      <div className="flex justify-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm leading-5 font-medium
                     text-blue-600 hover:text-blue-700"
        >
          {/* arrow-left icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to log-in
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;