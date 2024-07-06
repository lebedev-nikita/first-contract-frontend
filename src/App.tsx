import { TonConnectButton } from "@tonconnect/ui-react";
import { fromNano } from "ton-core";
import "./App.css";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

export default function App() {
  const {
    contract_address,
    contract_balance,
    counter_value,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className="Hint">
            {contract_balance
              ? `${fromNano(contract_balance)} TON`
              : "Loading..."}
          </div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <div
            style={{
              display: "flex",
              gap: 8,
              background: "black",
              padding: 8,
            }}
          >
            <button onClick={() => sendIncrement()}>Increment by 5</button>
            <button onClick={() => sendDeposit()}>Send Deposit</button>
            <button onClick={() => sendWithdrawalRequest()}>
              Withdraw 1.07 TON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
