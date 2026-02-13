import { create } from 'zustand';

const useAppStore = create((set) => ({
  // State: All our global data will be here
  students: [],
  homework: [],
  complaints: [],
  results: [],

  // Actions: Functions to update the state
  addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
  
  addHomework: (hw) => set((state) => ({ homework: [...state.homework, hw] })),

  addComplaint: (complaint) => set((state) => ({ complaints: [...state.complaints, complaint] })),
  
  addResult: (result) => set((state) => ({ results: [...state.results, result] })),

  // We can also have computed values or selectors here if needed later
}));

export default useAppStore;
