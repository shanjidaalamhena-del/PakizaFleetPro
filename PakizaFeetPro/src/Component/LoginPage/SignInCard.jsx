import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import InputField from "./InputField";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember }); // 👉 ekhane API call korba
  };

  return (
    // Card — fixed 448 na, parent follow korbe
    <div className="w-[500px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 pb-0 py-8 mt-3">
      <h2 className="text-center pt-0 text-[23px] font-bold text-[#111827]">
        Sign In
      </h2>
      <p className="text-center text-[14px] text-[#6b7280] mt-1 mb-6">
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <InputField
          label="Email"
          type="email"
          placeholder="shanjidaalamhenaa@gmail.com"
          LeftIcon={FiUser}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          LeftIcon={FiLock}
          RightIcon={showPassword ? FiEyeOff : FiEye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember me + Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-[13px] text-[#374151] cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            Remember me
          </label>

          <a href="#" className="text-[13px] text-blue-600 hover:underline">
            Forgot Password ?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-[44px] bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FiLogIn size={18} />
          Sign In
        </button>
      </form>
    </div>
  );
}