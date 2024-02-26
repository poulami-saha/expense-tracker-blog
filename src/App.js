import "./App.css";
import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();

    const expense = new FormData(event.target);
    const expenseDetails = Object.fromEntries(expense);

    const expenseCategory = expense.getAll("expenseCategory");
    expenseDetails.expenseCategory = expenseCategory;

    expenseDetails.id = expenses.length + 1;

    setExpenses((prev) => [...prev, expenseDetails]);
    event.target.reset();
  };

  const expenseDeleteHandler = (expenseToDelete) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseToDelete.id
    );
    if (updatedExpenses.length === 0) {
      setExpenses([]);
    } else {
      setExpenses(...updatedExpenses);
    }
  };

  return (
    <div className="container">
      <form onSubmit={addExpenseHandler} className="expense-form">
        <input
          type="date"
          name="expenseDate"
          max={"2024-12-31"}
          min={"2024-01-01"}
          required
          className="inputElement"
        />
        <input
          type="decimal"
          placeholder="Please Enter Amount"
          name="expenseAmount"
          required
          max={1000}
          min={2}
          className="inputElement"
        />
        <select name="expenseCategory" required className="inputElement">
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <button className="add-button">Add Expense</button>
      </form>
      {expenses && (
        <div className="wrapper">
          <h3>Expenses</h3>
          <hr />

          <ul className="expenses">
            {expenses.map((expense) => {
              return (
                <>
                  <li className="expense">
                    {expense.expenseDate} - ${expense.expenseAmount} - {expense.expenseCategory}
                    
                    <button
                      className="deleteButton"
                      onClick={() => expenseDeleteHandler(expense)}
                    >
                      Delete
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}
      <div className="wrapper">
        <h3>Summary</h3>
        <hr />
        <p className="total">
          Total Expenses: $
          {expenses
            .reduce((acc, curr) => Number(curr.expenseAmount) + acc, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default App;
