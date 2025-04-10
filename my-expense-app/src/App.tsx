import './App.css'
import { Expense } from './types'

function App() {
  const sampleExpense:Expense={
    id: "e1",
    title: "Sample Expense",
    amount: 100,
    category: "Food",
    date: new Date()
  }
  const expenseList:Expense[] = [
    {
      id: "e1",
      title: "Sample Expense",
      amount: 100,
      category: "Food",
      date: new Date()
    },
    {
      id: "e2",
      title: "Sample Expense 2",
      amount: 200,
      category: "Transport",
      date: new Date()
    }
  ]
  console.log(expenseList)
  console.log(sampleExpense)
  return (
    <>
      <h1>Id: {sampleExpense.id}</h1>
      <h1>Amount: {sampleExpense.amount}</h1>
      <h1>Title: {sampleExpense.title}</h1>
      <h1>Amount: {sampleExpense.amount}</h1>
    </>
  )
}

export default App
