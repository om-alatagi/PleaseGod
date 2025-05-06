
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function Wallet() {
//   const location = useLocation();
//   const userId = location.state?.userId || ""; // Get userId from login state

//   const [transaction, setTransaction] = useState({
//     receiverContact: "",
//     amount: ""
//   });

//   const [addMoneyData, setAddMoneyData] = useState({
//     balance: ""
//   });

//   const [walletBalance, setWalletBalance] = useState(0);

//   const API_BASE_URL = "http://13.233.196.111:8083/txns";
//   const WALLET_BASE_URL="http://13.233.196.111:8081/wallets";

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const response = await fetch(`${WALLET_BASE_URL}?userId=${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch balance");
//         }
//         const data = await response.json();
//         setWalletBalance(data.balance);
//       } catch (error) {
//         console.error("Error fetching wallet balance:", error);
//       }
//     };

//     if (userId) {
//       fetchWalletBalance();
//     }
//   }, [userId]);

//   const handleTransactionChange = (e) => {
//     setTransaction({ ...transaction, [e.target.name]: e.target.value });
//   };

//   const handleAddMoneyChange = (e) => {
//     setAddMoneyData({ ...addMoneyData, [e.target.name]: e.target.value });
//   };

//   const sendMoney = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           senderContact: parseInt(userId, 10), // Set senderContact from userId
//           receiverContact: parseInt(transaction.receiverContact, 10),
//           amount: parseFloat(transaction.amount)
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.text();
//       alert("Transaction Successful: " + result);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Transaction Failed: " + error.message);
//     }
//   };

//   const addMoney = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/AddMoney`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userId: parseInt(userId, 10), // Set userId from login state
//           balance: parseFloat(addMoneyData.balance)
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.text();
//       alert("Money Added Successfully: " + result);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Add Money Failed: " + error.message);
//     }
//   };

//   const containerStyle = {
//     maxWidth: "500px",
//     margin: "40px auto",
//     padding: "20px",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     position: "relative"
//   };

//   const headerStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#333"
//   };

//   const balanceStyle = {
//     position: "absolute",
//     top: "10px",
//     right: "20px",
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "#333"
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px"
//   };

//   const buttonStyle = (bgColor) => ({
//     width: "100%",
//     padding: "12px",
//     backgroundColor: bgColor,
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginBottom: "20px"
//   });

//   const sectionStyle = {
//     marginBottom: "40px",
//     borderBottom: "1px solid #eee",
//     paddingBottom: "20px"
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={balanceStyle}>User ID: {userId} | Balance: INR{walletBalance}</div>
//       <h1 style={headerStyle}>Wallet Dashboard</h1>

//       <div style={sectionStyle}>
//         <h2 style={{ textAlign: "center", color: "#555" }}>Send Money</h2>
//         <input
//           type="number"
//           name="receiverContact"
//           placeholder="Receiver Contact"
//           value={transaction.receiverContact}
//           onChange={handleTransactionChange}
//           style={inputStyle}
//           required
//         />
//         <input
//           type="number"
//           step="0.01"
//           name="amount"
//           placeholder="Amount"
//           value={transaction.amount}
//           onChange={handleTransactionChange}
//           style={inputStyle}
//           required
//         />
//         <button onClick={sendMoney} style={buttonStyle("blue")}>
//           Send Money
//         </button>
//       </div>

//       <div>
//         <h2 style={{ textAlign: "center", color: "#555" }}>Add Money</h2>
//         <input
//           type="number"
//           step="0.01"
//           name="balance"
//           placeholder="Balance"
//           value={addMoneyData.balance}
//           onChange={handleAddMoneyChange}
//           style={inputStyle}
//           required
//         />
//         <button onClick={addMoney} style={buttonStyle("green")}>
//           Add Money
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Wallet;
import React, { useState, useEffect } from "react";
import QRCodeLib from "qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useLocation } from "react-router-dom";

function Wallet() {
  const location = useLocation();
  const userId = location.state?.userId || "";

  // State hooks
  const [transaction, setTransaction] = useState({ receiverContact: "", amount: "" });
  const [addMoneyData, setAddMoneyData] = useState({ balance: "" });
  const [walletBalance, setWalletBalance] = useState(0);


  const [qrUrl, setQrUrl] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);


  const [showScanner, setShowScanner] = useState(false);


  const API_TXN_URL = "http://65.2.187.249:8083/txns";
  const API_WALLET_URL = "http://65.2.187.249:8081/wallets";

 
  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch(`${API_WALLET_URL}?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch balance");
        const data = await res.json();
        setWalletBalance(data.balance);
      } catch (err) {
        console.error(err);
      }
    }
    if (userId) fetchBalance();
  }, [userId]);

  useEffect(() => {
    if (!showGenerator) return;
    QRCodeLib.toDataURL(
      JSON.stringify({ userId: parseInt(userId, 10) })
    )
      .then(setQrUrl)
      .catch(console.error);
  }, [showGenerator, userId]);

 
  useEffect(() => {
    let html5QrCode;
    if (showScanner) {
      html5QrCode = new Html5Qrcode("reader");
      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            try {
              const { userId: scannedId } = JSON.parse(decodedText);
              setTransaction((tx) => ({ ...tx, receiverContact: scannedId }));
              setShowScanner(false);
            } catch (e) {
              console.error("Invalid QR data", e);
            }
          }
        )
        .catch(console.error);
    }
    return () => {
      if (html5QrCode) {
        html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
      }
    };
  }, [showScanner]);


  const sendMoney = async () => {
    try {
      const response = await fetch(`${API_TXN_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderContact: parseInt(userId, 10),
          receiverContact: parseInt(transaction.receiverContact, 10),
          amount: parseFloat(transaction.amount)
        })
      });
      if (!response.ok) throw new Error(response.statusText);
      alert("Transaction Successful");
    } catch (e) {
      console.error(e);
      alert("Transaction Failed");
    }
  };

  const addMoney = async () => {
    try {
      const response = await fetch(`${API_TXN_URL}/AddMoney`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          balance: parseFloat(addMoneyData.balance)
        })
      });
      if (!response.ok) throw new Error(response.statusText);
      alert("Money Added Successfully");
      setAddMoneyData({ balance: "" });
    } catch (e) {
      console.error(e);
      alert("Add Money Failed");
    }
  };


  const container = { maxWidth: 500, margin: '40px auto', padding: 20, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' };
  const header = { textAlign: 'center', marginBottom: 20, color: '#333' };
  const buttonGroup = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: 20 };
  const panel = { padding: 20, border: '1px solid #ddd', borderRadius: 8, marginBottom: 20, textAlign: 'center' };
  const input = { width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 };
  const btn = (bg) => ({ width: '100%', padding: 12, backgroundColor: bg, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 16 });

  return (
    <div style={container}>
      <h1 style={header}>Wallet Dashboard</h1>
      <div style={buttonGroup}>
        <button onClick={() => setShowGenerator(v => !v)}>
          {showGenerator ? 'Hide My QR' : 'Show My QR'}
        </button>
        <button onClick={() => setShowScanner(v => !v)}>
          {showScanner ? 'Close Scanner' : 'Scan QR'}
        </button>
      </div>

      {showGenerator && (
        <div style={panel}>
          <h4>Scan to Pay</h4>
          {qrUrl && <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} />}
        </div>
      )}

      {showScanner && <div id="reader" style={{ width: '100%', minHeight: 300, marginBottom: 20 }} />}

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ textAlign: 'center', color: '#555' }}>Send Money</h2>
        <input
          type="number"
          name="receiverContact"
          placeholder="Receiver Contact"
          value={transaction.receiverContact}
          onChange={(e) => setTransaction(tx => ({ ...tx, receiverContact: e.target.value }))}
          style={input}
          required
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={(e) => setTransaction(tx => ({ ...tx, amount: e.target.value }))}
          style={input}
          required
        />
        <button onClick={sendMoney} style={btn('blue')}>Send Money</button>
      </div>

      <div>
        <h2 style={{ textAlign: 'center', color: '#555' }}>Add Money</h2>
        <input
          type="number"
          step="0.01"
          name="balance"
          placeholder="Balance"
          value={addMoneyData.balance}
          onChange={(e) => setAddMoneyData({ balance: e.target.value })}
          style={input}
          required
        />
        <button onClick={addMoney} style={btn('green')}>Add Money</button>
      </div>
    </div>
  );
}

export default Wallet;
