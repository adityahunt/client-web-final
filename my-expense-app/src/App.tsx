// import { addExpense } from './store/features/expenses/expenseSlice';
import 
// React,
 { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, 
  // CardFooter 
} from "@/components/ui/card";
import './App.css';
import Header from './components/Header';
import { Expense } from './types';
import ExpenseListItem from './components/ExpenseListItem';
import { useAppSelector, useAppDispatch } from './store/hooks';
import ExpenseForm from './components/ui/ExpenseForm';
import { deleteExpense, 
  // editExpense 
} from './store/features/expenses/expenseSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  // DialogFooter,
  // DialogClose
} from "@/components/ui/dialog";

function App() {
  // const year = new Date().getFullYear();
  const appTitle = "My Dynamic Expense Tracker";
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const dispatch = useAppDispatch();
  // const [inputValue, setInputValue] = useState<string>('');
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const handleClearClick = () => {
  //   setInputValue('');
  // };
  // const handleAddDummy = () => {
  //   const dummyExpenseData = {
  //     title: `Test Expense ${Date.now() % 1000}`,
  //     amount: Math.floor(Math.random() * 100) + 1,
  //     category: 'Testing',
  //     date: new Date()
  //   };
  //   console.log("Dispatching addExpense with:", dummyExpenseData);
  //   dispatch(addExpense(dummyExpenseData));
  // };

  useEffect(() => {
    console.log("App component mounted!");
  }, []);

  console.log("Expenses from Redux Store:", expenses);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const handleDeleteExpense = (id: string) => {
    console.log("App handling delete for id:", id);
    dispatch(deleteExpense(id));
  };

  const handleStartEdit = (expense: Expense) => {
    console.log("App handling start edit for:", expense);
    setEditingExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingExpense(null);
  };

  const handleEditSubmitSuccess = () => {
    handleCloseEditDialog();
  };

  return (
    <div className="container mx-auto p-4">
      <Header title={appTitle} />
      <main className="mt-6 space-y-8">
        <ExpenseForm isEditing={false} />
        <div className="mt-8">
          <Card>
            <CardHeader><CardTitle>Expenses List</CardTitle></CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-muted-foreground text-center">No expenses recorded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {expenses.map((expense) => (
                    <ExpenseListItem
                      key={expense.id}
                      expense={expense}
                      onDelete={handleDeleteExpense}
                      onEdit={handleStartEdit}
                    />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
              <DialogDescription>
                Make changes to your expense here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ExpenseForm
              isEditing={true}
              initialData={editingExpense}
              onSubmitSuccess={handleEditSubmitSuccess}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

export default App;
