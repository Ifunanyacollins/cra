import { create } from 'zustand'



export const useStore = create((set) => ({
  access_token: null,
  update_access_token: (token) => set({   access_token: token }),
}))

