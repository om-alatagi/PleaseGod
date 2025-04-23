
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Wallet() {
  const location = useLocation();
  const userId = location.state?.userId || ""; // Get userId from login state

  const [transaction, setTransaction] = useState({
    receiverContact: "",
    amount: ""
  });

  const [addMoneyData, setAddMoneyData] = useState({
    balance: ""
  });

  const [walletBalance, setWalletBalance] = useState(0);

  const API_BASE_URL = "http://localhost:8083/txns";
  const WALLET_BASE_URL="http://localhost:8081/wallets";

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(`${WALLET_BASE_URL}?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        const data = await response.json();
        setWalletBalance(data.balance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    if (userId) {
      fetchWalletBalance();
    }
  }, [userId]);

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleAddMoneyChange = (e) => {
    setAddMoneyData({ ...addMoneyData, [e.target.name]: e.target.value });
  };

  const sendMoney = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderContact: parseInt(userId, 10), // Set senderContact from userId
          receiverContact: parseInt(transaction.receiverContact, 10),
          amount: parseFloat(transaction.amount)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      alert("Transaction Successful: " + result);
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction Failed: " + error.message);
    }
  };

  const addMoney = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/AddMoney`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10), // Set userId from login state
          balance: parseFloat(addMoneyData.balance)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      alert("Money Added Successfully: " + result);
    } catch (error) {
      console.error("Error:", error);
      alert("Add Money Failed: " + error.message);
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  };

  const balanceStyle = {
    position: "absolute",
    top: "10px",
    right: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px"
  };

  const buttonStyle = (bgColor) => ({
    width: "100%",
    padding: "12px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px"
  });

  const sectionStyle = {
    marginBottom: "40px",
    borderBottom: "1px solid #eee",
    paddingBottom: "20px"
  };

  return (
    <div style={containerStyle}>
      <div style={balanceStyle}>User ID: {userId} | Balance: INR{walletBalance}</div>
      <h1 style={headerStyle}>Wallet Dashboard</h1>

      <div style={sectionStyle}>
        <h2 style={{ textAlign: "center", color: "#555" }}>Send Money</h2>
        <input
          type="number"
          name="receiverContact"
          placeholder="Receiver Contact"
          value={transaction.receiverContact}
          onChange={handleTransactionChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleTransactionChange}
          style={inputStyle}
          required
        />
        <button onClick={sendMoney} style={buttonStyle("blue")}>
          Send Money
        </button>
      </div>

      <div>
        <h2 style={{ textAlign: "center", color: "#555" }}>Add Money</h2>
        <input
          type="number"
          step="0.01"
          name="balance"
          placeholder="Balance"
          value={addMoneyData.balance}
          onChange={handleAddMoneyChange}
          style={inputStyle}
          required
        />
        <button onClick={addMoney} style={buttonStyle("green")}>
          Add Money
        </button>
      </div>
    </div>
  );
}

export default Wallet;
