import { TonConnectButton } from "@tonconnect/ui-react";
import { fromNano } from "ton-core";
import "./App.css";
import { useMainContract } from "./hooks/useMainContract";

export default function App() {
  const contract = useMainContract();

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="card">
          <b>Our contract Address</b>
          <div className="hint">{contract?.address.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className="hint">
            {contract ? `${fromNano(contract.balance)} TON` : "Loading..."}
          </div>
        </div>

        <div className="card">
          <b>Counter Value</b>
          <div>{contract?.counter_value ?? "Loading..."}</div>
        </div>

        {contract && (
          <div
            style={{
              display: "flex",
              gap: 8,
              background: "black",
              padding: 8,
            }}
          >
            <button onClick={() => contract.sendIncrement()}>
              Increment by 5
            </button>
            <button onClick={() => contract.sendDeposit(0.5)}>
              Send Deposit 0.5 TON
            </button>
            <button onClick={() => contract.sendWithdrawalRequest(1)}>
              Withdraw 1 TON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
