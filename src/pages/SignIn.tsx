import React, { useState } from "react";
import { Navbar, ProfileForm } from "../components";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useDataverse } from "../context/DataverseProvider";

const SignIn = () => {
  const connect = useMetamask();
 const { address} = useDataverse()

  return (
    <>
      <Navbar />
      <div className="min-h-[800px] overflow-y-scroll w-full flex items-center justify-center">
        {!address && (
          <button
            onClick={() =>
              connect({
                chainId: 314159,
              })
            }
            className="gradient-border-button border-4 w-[300px] rounded-full relative  py-4 text-lg font-medium text-white"
          >
            Connect Wallet
          </button>
        )}
        {address && <ProfileForm />}
      </div>
    </>
  );
};

export default SignIn;
