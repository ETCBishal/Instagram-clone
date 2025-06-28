import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
light: localStorage.getItem('light') !== null 
  ? localStorage.getItem('light') === 'true' 
  : true,

  changeTheme: async () => {
    const currentTheme = get().light;
    const newTheme = !currentTheme;
    set({ light: newTheme });
    localStorage.setItem("light", newTheme.toString());

  },
}));
