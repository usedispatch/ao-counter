import { useEffect, useState } from "react";
import "./App.css";
import {
  getWalletAddress,
  connectArConnectWallet,
  decrementCounter,
  incrementCounter,
  getCounter,
} from "./process";

import { useQuery } from "@tanstack/react-query";

function App() {
  const [wallet, setWallet] = useState("");
  const {
    data: counter,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["counter"],
    queryFn: getCounter,
  });

  useEffect(() => {
    async function CheckIfConnected() {
      const wallet = await getWalletAddress();
      if (wallet) {
        setWallet(wallet);
      }
    }
    CheckIfConnected();
  }, []);

  useEffect(() => {
    async function getCounterInfo() {
      const counter = await getCounter();
      console.log("counter", counter);
    }
    getCounterInfo();
  }, []);

  const checkWalletConnection = async (action: () => Promise<any>) => {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      await action();
      refetch();
    } catch (error) {
      console.error("Error performing action", error);
      alert("Failed to perform action. Please try again.");
    }
  };

  return (
    <>
      <h1>AO Starter Code</h1>
      {isLoading || isFetching ? <p>Loading...</p> : <p>Counter: {counter}</p>}
      <div className="card">
        {wallet ? (
          <p>Connected to {wallet}</p>
        ) : (
          <button onClick={connectArConnectWallet}>Connect to ArConnect</button>
        )}
        <button
          style={{ marginRight: 12 }}
          onClick={() => checkWalletConnection(incrementCounter)}
        >
          Increment
        </button>
        <button onClick={() => checkWalletConnection(decrementCounter)}>
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;
