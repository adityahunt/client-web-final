// import React, { useState } from 'react'; 
import { Expense } from '@/types';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface ExpenseListItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void; 
}

function ExpenseListItem({ expense, onDelete, onEdit }: ExpenseListItemProps) {
  const handleDeleteClick = () => {
     console.log("Confirm Delete for:", expense.id);
     onDelete(expense.id);
  };

  const handleEditClick = () => {
    console.log("Edit clicked for:", expense.id);
    onEdit(expense); 
  };

  return (
    <li className="border-b p-3 flex flex-wrap sm:flex-nowrap justify-between items-center gap-x-4 gap-y-2 hover:bg-gray-50">
      <div className="flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center basis-auto">
        <div className="mr-4 mb-1 sm:mb-0"> 
            <div className="font-medium">{expense.title}</div>
            <div className="text-sm text-muted-foreground">{expense.category}</div>
        </div>
        <div className="text justify-center flex-shrink-0"> 
             <div className="font-semibold">${expense.amount.toFixed(2)}</div>
             <div className="text-xs text-muted-foreground">{expense.date.toLocaleDateString()}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 flex-shrink-0 w-full sm:w-auto justify-end">
         <Button onClick={handleEditClick} variant="outline" size="sm" className="w-full sm:w-auto">Edit</Button>
         <AlertDialog>
           <AlertDialogTrigger asChild>
             <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto">
               Delete
             </Button>
           </AlertDialogTrigger>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                 This action cannot be undone. This will permanently delete the expense
                 titled "{expense.title}".
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleDeleteClick} className="bg-red-600 hover:bg-red-700">
                 Continue
               </AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
      </div>
    </li>
  );
}

export default ExpenseListItem;