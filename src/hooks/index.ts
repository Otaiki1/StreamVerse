import { useContract } from "@thirdweb-dev/react";

export * from "./useStream";
export * from "./useWallet";

export const returnContract = (address: string) => {
  const { contract } = useContract(address);
  return contract;
};
