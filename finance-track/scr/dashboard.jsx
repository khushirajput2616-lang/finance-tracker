import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/transactionSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const transactions = useSelector((state) => state.transactions.list);
  const dispatch = useDispatch();

  const total = transactions.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div>
      <h1>Finance Tracker</h1>

      <h2>Total Balance: ₹{total}</h2>

      <Link to="/add">Add Transaction</Link>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.text} - ₹{t.amount}
            <button onClick={() => dispatch(deleteTransaction(t.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}