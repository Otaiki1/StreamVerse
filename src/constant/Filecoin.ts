import PolyverseAbi from "./Polyverse.json";
import PolyverseTokenAbi from "./PolyverseToken.json";
import PolyverseSubscriptionAbi from "./SubscriptionContract.json";

const PolyverseToken = "0xf153245Bbe7BE3CCc9e7e8310c384988eb0F7A8d";

const Polyverse = "0x2f40a1f04be1a7d87e3651AD23F62B97B14D9C57";

const SubscriptionContract = "0xAa6801AA07299181ca051fD5428f4f1e3125C5a6";

const PolyverseABI = PolyverseAbi.abi;
const TokenAbi = PolyverseTokenAbi.abi;
const subscriptionAbi = PolyverseSubscriptionAbi.abi;

export {
  Polyverse,
  PolyverseABI,
  subscriptionAbi,
  SubscriptionContract,
  TokenAbi,
  PolyverseToken,
};
