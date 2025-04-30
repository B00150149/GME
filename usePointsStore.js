import { create } from 'zustand';

const usePointsStore = create((set) => ({
  points: 0, // Initial points balance
  pointsHistory: [],
  
  setPoints: (newPoints) => set({ points: newPoints }), // Set points directly
  addPoints: (earnedPoints) => set((state) => ({ points: state.points + earnedPoints })), // Increment points
  deductPoints: (spentPoints) => set((state) => ({ points: state.points - spentPoints })), // Decrement points
  setPointsHistory: (newHistory) => set({ pointsHistory: newHistory }),

  
  
    addPointsHistory: (newEntry) => set((state) => ({
    pointsHistory: [...state.pointsHistory, newEntry],
  })),
  
  clearPointsHistory: () => set({ pointsHistory: [] }),
  
  removePointsHistoryEntry: (index) => set((state) => {
    if (index < 0 || index >= state.pointsHistory.length) return {}; 
    const newHistory = [...state.pointsHistory];
    newHistory.splice(index, 1);
    return { pointsHistory: newHistory };
  }),
  
  updatePointsHistoryEntry: (index, newEntry) => set((state) => {
    if (index < 0 || index >= state.pointsHistory.length) return {}; 
    const newHistory = [...state.pointsHistory];
    newHistory[index] = newEntry;
    return { pointsHistory: newHistory };
  }),
  
 
}));

export default usePointsStore;