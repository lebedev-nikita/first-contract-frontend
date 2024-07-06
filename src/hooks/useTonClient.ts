import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export const useTonClient = () => {
  const getClient = async () => {
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    return new TonClient({ endpoint });
  };

  return useAsyncInitialize(getClient);
};
