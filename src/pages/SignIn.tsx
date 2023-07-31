import React, { useState } from "react";
import { Navbar, ProfileForm } from "../components";
import { usePolyverseContext } from "../context/Auth";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

const SignIn = () => {
const connect = useMetamask()
const address = useAddress()

  
  return (
    <>
      <Navbar />
      <div className="min-h-[800px] w-full flex items-center justify-center">
        {!address && (
          <button
            onClick={() => connect({
              chainId: 314159
            })}
            className="gradient-border-button border-4 w-[300px] rounded-full relative  py-4 text-lg font-medium text-white"
          >
            Connect Wallet
          </button>
        )}

        {address && (
          <ProfileForm />
        )}
      </div>
    </>
  );
};

export default SignIn;
