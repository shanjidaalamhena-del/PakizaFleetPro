import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
 const navigate = useNavigate();
const host = import.meta.env.VITE_API_URL

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Reset code sent to:", email);
  //   // apnar API call ekhane
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");
  setError("");

  try {
    const response = await fetch(
      `${host}/user/profile/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      setMessage(result.message || "Reset code sent successfully.");

      navigate("/reset-password", {
        state: {
          token: result.data?.token,
          email: email,
        },
      });
    } else {
  console.log("API Error:", result);

  // testing-এর জন্য page open করবে
  navigate("/reset-password", {
    state: {
      email: email,
    },
  });
}
  } catch (error) {
    console.error("Forgot password error:", error);
    setError("Unable to connect to the server.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="w-[450px] h-[300px] bg-white rounded-xl mt-5
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-10 py-6
                 flex flex-col justify-between gap-4"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[23px] leading-8 font-bold  text-gray-900">
          Forgot Password?
        </h2>
        <p className="mt-3 text-base leading-6 text-gray-500">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {/* Email + Send Code */}
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email <span className="text-red-500">*</span>
        </label>

        <div className="relative mt-2">
          {/* person icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
            />
          </svg>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="shanjidaalamhenaa@gmail.com"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#EDF1FB] text-sm
                       text-gray-800 placeholder-gray-600 border border-transparent
                       focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

       {/* <button 
  type="button"
  onClick={() => navigate("/reset-password")}
  className="mt-4 w-full h-11 bg-blue-600 hover:bg-blue-700 
             text-white text-sm font-semibold rounded-lg transition-colors" 
>
  Send Code 
</button> */}

<button 
  type="submit"
  className="mt-4 w-full h-11 bg-blue-600 hover:bg-blue-700 
             text-white text-sm font-semibold rounded-lg transition-colors" 
>
  Send Code 
</button>
      </form>

      {/* Back to log-in */}
      <div className="flex justify-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium
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

export default ForgotPassword;