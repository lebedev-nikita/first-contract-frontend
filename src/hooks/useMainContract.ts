import { useEffect, useState } from "react";
import { Address, toNano } from "ton-core";
import { MainContract } from "../contracts/MainContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>(null);

  const [balance, setBalance] = useState<null | number>(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQDpdwccKGWxEeMDioEbyhxIKrES1YDM50ZifHWIR-xLnPrK")
    );

    return client.open(contract);
  }, [client]);

  useEffect(() => {
    console.count("main contract changed");
    setContractData(null);

    async function setValue() {
      console.count("getValue()");
      if (!mainContract) return;

      const val = await mainContract.getData();
      const { balance } = await mainContract.getBalance();

      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
      });
      setBalance(balance);
    }

    setValue();
    const timerId = setInterval(() => setValue(), 5000);

    return () => clearInterval(timerId);
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    async sendIncrement() {
      return mainContract?.sendIncrement(sender, toNano(0.05), 5);
    },
    async sendDeposit() {
      return mainContract?.sendDeposit(sender, toNano(1));
    },
    async sendWithdrawalRequest() {
      return mainContract?.sendWithdrawalRequest(
        sender,
        toNano(0.05),
        toNano(0.7)
      );
    },
  };
}