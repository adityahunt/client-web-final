import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAppDispatch } from '@/store/hooks';
import { addExpense, editExpense } from '@/store/features/expenses/expenseSlice';
import { Expense } from '@/types';

interface ExpenseFormProps {
  initialData?: Expense | null;
  onSubmitSuccess?: () => void;
  isEditing?: boolean;
}

interface FormData {
  title: string;
  amount: string;
  category: string;
  date: string;
}

function ExpenseForm({ initialData = null, onSubmitSuccess, isEditing = false }: ExpenseFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount.toString(),
        category: initialData.category,
        date: initialData.date.toISOString().split('T')[0],
      });
    } else {
      setFormData({ title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountNumber = parseFloat(formData.amount);
    if (!formData.title || !formData.category || !formData.date || isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please fill in all fields correctly (Amount must be a positive number).");
      return;
    }

    if (isEditing && initialData) {
      const updatedExpense: Expense = {
        id: initialData.id,
        title: formData.title,
        amount: amountNumber,
        category: formData.category,
        date: new Date(formData.date + 'T00:00:00'),
      };
      dispatch(editExpense(updatedExpense));
    } else {
      const expenseData = {
        title: formData.title, amount: amountNumber, category: formData.category, date: new Date(formData.date + 'T00:00:00'),
      };
      dispatch(addExpense(expenseData));
    }

    if (!isEditing) {
      setFormData({ title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    }

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Coffee"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 4.50"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Food"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center mt-4">
          <Button type="submit">Add Expense</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ExpenseForm;
