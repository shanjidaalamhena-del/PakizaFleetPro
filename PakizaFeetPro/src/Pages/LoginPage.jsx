
import SignInCard from '../Component/LoginPage/SignInCard'
import LoginLogo from "../Component/LoginPage/LoginLogo";
export default function LoginPage() {
  return (
<div className="fixed min-h-screen w-full bg-[hsl(210,100%,100%)] overflow-hidden flex flex-col items-center">

      <LoginLogo />

      
        <div className="mt-0 text-center">
          <p className="mt-1 mb-2 text-[18px] text-[#525f70]">
            Sign into your Pakiza FleetPro Dashboard
          </p>
        </div>

      <div className="mt-5">
        <SignInCard />
      </div>

    </div>
  )
}