import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import './App.css';
import Header from './components/Header';
import { Expense } from './types';

const DUMMY_EXPENSES: Expense[] = [
  { id: 'e1', title: 'Groceries', amount: 75.50, category: 'Food', date: new Date(2023, 9, 15) },
  { id: 'e2', title: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: new Date(2023, 9, 28) },
  { id: 'e3', title: 'New Keyboard', amount: 99.99, category: 'Shopping', date: new Date(2023, 10, 5) },
  { id: 'e4', title: 'Coffee', amount: 4.25, category: 'Food', date: new Date(2023, 10, 6) },
];

function App() {
  const year = new Date().getFullYear();
  const appTitle = "My Dynamic Expense Tracker";
  const [inputValue, setInputValue] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue('');
  };

  return (
    <div className="container mx-auto p-4">
      <Header title={appTitle} />
      <main className="mt-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Demo Input Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="demoInput">Demo Input</Label>
                <Input
                  id="demoInput"
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                You typed: {inputValue || <span className="italic">Nothing yet</span>}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClearClick} variant="outline">
              Clear Input
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8">
          <Card>
            <CardHeader><CardTitle>Add New Expense (Placeholder)</CardTitle></CardHeader>
            <CardContent>Form fields will go here...</CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader><CardTitle>Expenses List</CardTitle></CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p>No expenses found. Add some!</p>
              ) : (
                <ul>
                  {expenses.map((expense) => (
                    <li key={expense.id} className="border-b p-2 flex justify-between items-center">
                      <div>
                        <span className="font-medium">{expense.title}</span>
                        <span className="text-sm text-muted-foreground ml-2">({expense.category})</span>
                      </div>
                      <div>
                        <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground ml-2">{expense.date.toLocaleDateString()}</span>
                      </div>
                      <div className="ml-4">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-8 text-center text-muted-foreground">
        <p>© {year} Your Name/Company</p>
      </footer>
    </div>
  );
}

export default App;
