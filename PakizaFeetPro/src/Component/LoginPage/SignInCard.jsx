import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import InputField from "./InputField";
const host = import.meta.env.VITE_API_URL

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ email, password, remember }); 
  // };

  console.log(host)

const handleSubmit = async (e) => {
  e.preventDefault();
    setError("");
     setLoading(true);
  try {
    const response = await fetch(
      `${host}/user/profile/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                email: email,
          password: password,
        }),
      }
    );

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      console.log("Login successful!");

      localStorage.setItem(
        "access_token",
        result.data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        result.data.refresh_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );


       navigate("/landing");
    
    } else {
      // console.log("Login failed:", result.message);
  //  setError(result.message || "Invalid email or password");
  
 setError("Incorrect email or password. Please try again.");
 
}
  } catch (error) {
    console.error("Login error:", error);
     setError("Server not reachable. Please try again.");
  }finally {
    setLoading(false);      
  }
};



  return (
    // Card — fixed 448 na, parent follow korbe
    <div className="w-[450px] h-[420px]  border border-gray-100 bg-white rounded-xl
                 shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-10 py-5 
                 flex flex-col justify-between gap-3 item-center justify-center">
      <h2 className="text-center text-[23px] font-bold text-[#111827] -mt-15 pb-2">
        Sign In
      </h2>
      <p className=" text-center text-[15px] text-[#6b7280] pt-0">
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


        {error && (
  <p className="text-sm text-red-500 mt-2">
    {error}
  </p>
)}

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

          
        
          <Link
  to="/forgot-password"
  className="text-[13px] text-blue-600 hover:underline"
>
  Forgot Password ?
</Link>
        </div>

        {/* Button */}
      <button
  type="submit"
  disabled={loading}
  className="w-full h-[40px] bg-blue-600 hover:bg-blue-700 text-white text-[15px] 
             font-medium rounded-lg flex items-center justify-center gap-2 transition
             disabled:opacity-60 disabled:cursor-not-allowed"
>
{loading ? (
    "Signing in..."
  ) : (
    <>
      <FiLogIn size={18} />
      Sign In
    </>
  )}
</button>
      </form>
    </div>
  );
}