import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/transactionSlice";
import { useNavigate } from "react-router-dom";

export default function AddTransaction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  // 🔹 Quick preset options
  const presets = [
    { name: "Salary", amount: 5000, type: "income", category: "Salary" },
    { name: "Food", amount: 200, type: "expense", category: "Food" },
    { name: "Travel", amount: 300, type: "expense", category: "Travel" },
    { name: "Shopping", amount: 1000, type: "expense", category: "Shopping" },
  ];

  const handlePreset = (item) => {
    setText(item.name);
    setAmount(item.amount);
    setType(item.type);
    setCategory(item.category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      text,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    };

    dispatch(addTransaction(newTransaction));
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Transaction</h1>

      {/* 🔹 Quick Buttons */}
      <h3>Quick Add</h3>
      {presets.map((item, index) => (
        <button key={index} onClick={() => handlePreset(item)}>
          {item.name}
        </button>
      ))}

      <br /><br />

      <form onSubmit={handleSubmit}>
        
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <br /><br />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br /><br />

        {/* Type */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <br /><br />

        {/* Category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Bills">Bills</option>
        </select>
        <br /><br />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}