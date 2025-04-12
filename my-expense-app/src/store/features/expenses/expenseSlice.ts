import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '@/types';

interface ExpensesState {
    expenses: Expense[];
}

const initialState: ExpensesState = {
    expenses: [],
};

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
            const newExpense: Expense = {
                id: new Date().getTime().toString() + Math.random().toString(36).substring(2, 9),
                ...action.payload,
            };
            state.expenses.push(newExpense);
        },
        editExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            const index = state.expenses.findIndex(expense => expense.id === action.payload);
            if (index !== -1) {
                state.expenses.splice(index, 1);
            }
        },
        setExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload;
        }
    },
});

export const { addExpense, editExpense, deleteExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
