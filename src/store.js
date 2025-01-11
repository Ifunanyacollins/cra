import { create } from 'zustand'



export const useStore = create((set) => ({
  access_token: null,
  openIndex: null, 
  memoId: null,
  setOpenIndex: (index) => set({    openIndex: index,  }),
  update_access_token: (token) => set({   access_token: token , openIndex: null}),
  update_memo: (memoId) => set({ memoId}),
}))

