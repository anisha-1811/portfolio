import { create } from 'zustand'

export const useSceneStore = create((set) => ({
  activeSection: 0,
  setActiveSection: (s) => set({ activeSection: s }),

  selectedPhoto: null,
  setSelectedPhoto: (p) => set({ selectedPhoto: p }),

  mouse: { x: 0, y: 0 },
  setMouse: (x, y) => set({ mouse: { x, y } }),

  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
}))