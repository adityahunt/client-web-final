import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './features/expenses/expenseSlice';
import { Expense } from '@/types'; 

const LOCAL_STORAGE_KEY = 'reduxExpensesState';

const loadState = (): { expenses: { expenses: Expense[] } } | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);

    if (parsedState.expenses && Array.isArray(parsedState.expenses.expenses)) {
        parsedState.expenses.expenses = parsedState.expenses.expenses.map((exp: any) => ({
            ...exp,
            date: new Date(exp.date),
        }));
    }

    return parsedState;

  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const stateToSave = { expenses: state.expenses };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
