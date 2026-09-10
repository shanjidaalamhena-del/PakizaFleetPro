import React from 'react'
import LoginLogo from '../Component/LoginPage/LoginLogo'

import SignInCard from '../Component/LoginPage/SignInCard'

export default function LoginPage() {
  return (
     <div className="absoulate min-h-screen w-full bg-[hsl(210,100%,100%)] overflow-hidden flex items-center justify-center flex flex-col items-center w-full max-w-[448px
     ]">

  {/* <div className="relative z-10 flex flex-col items-center w-full max-w-[448px]">  */}

      <LoginLogo/>

   <div className="mt=0 item-center">
         <h1 className="text-[30px] font-bold text-[#111827] pl-14 items-center justify-center"> Pakiza FleetPro</h1>
       
        <p className="mt-1 text-[18px] text-[#525f70]">
          Sign in to your Pakiza FleetPro dashboard
        </p>
 </div>
 <div classname="pt-20 w-[]">
      <SignInCard/>
</div>
    </div>

  )
}
