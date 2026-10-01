import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const otp = location.state?.otp;
  const token = location.state?.token;


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const host = import.meta.env.VITE_API_URL


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (password.length < 8) {
  //     setError("Password must be at least 8 characters");
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   setError("");
  //   console.log("Password reset successful:", password);
  //   // apnar API call ekhane, tarpor navigate("/login")
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!otp) {
    setError("OTP missing");
    return;
  }

  if (!token) {
    setError("Reset token missing");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setError("");

  try {
    const response = await fetch(
      `${host}/user/profile/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          otp: otp,
          new_password: password,
        }),
      }
    );

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      alert("Password reset successfully");

      navigate("/login");
    } else {
      setError(result.message || "Password reset failed");
    }
  } catch (error) {
    console.error("Reset password error:", error);
    setError("Something went wrong. Please try again.");
  }
};



  return (
    <div
      className="w-[408px]  h-[400px] bg-white rounded-xl
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-10 py-6
                 flex flex-col justify-between gap-4"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[26px] leading-8 font-bold text-gray-900">
          Password Reset
        </h2>
        <p className="mt-2 text-base leading-6 text-gray-500">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {/* Form (gap: 16) */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* New Password */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-900"
          >
            New Password <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-2">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full h-10 pl-3 pr-10 rounded-lg bg-[#EDF1FB] text-sm
                         text-gray-800 placeholder-gray-600 border border-transparent
                         focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />

            {/* eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                /* eye open */
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                /* eye-off */
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-900"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-2">
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="password"
              className="w-full h-10 pl-3 pr-10 rounded-lg bg-[#EDF1FB] text-sm
                         text-gray-800 placeholder-gray-600 border border-transparent
                         focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* error message */}
        {error && <p className="text-xs text-red-500 -mt-2">{error}</p>}

        {/* Reset Password button */}
        <button
          type="submit"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700
                     text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Reset Password
        </button>
      </form>

      {/* Back to log-in */}
      <div className="flex justify-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium
                     text-gray-700 hover:text-gray-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to log-in
        </a>
      </div>
    </div>
  );
};

export default NewPassword;