import { create } from "zustand";

// STEP-> 1... go subjectAndDateRecord and import ItemStore and use it(ARRAY-->push concept)
const ItemStore = create((set, get) => ({
  items: [],
  addItem: ({ sub_id, ex_date }) => set((state) => ({ items: [...state.items, { sub_id, ex_date }] })),

  // step1-->>------for Total Record--> go subjectAndDateRecord...(DYNAMIC store)
  totalReg: 0,
  addTotalRegistration: ({ total_reg }) => set((state) => ({ totalReg: state.totalReg, total_reg })),
  totalComp: 0,
  addTotalCompetition: ({ total_comp }) => set((state) => ({ totalComp: state.totalComp, total_comp })),

  //ERROR SOLVE --> after goBack when again click submit btn than show null(0) result on totalRecord section bcz its refresh. 
  // step A---> so instead setExpiryDate useState we use from the store ... make expiryDate var & go subjectAndDateRecord....
  expiryDate: [],
  addExpiryDate: ({ expiry_date }) => set((state) => ({ expiryDate: [...state.expiryDate, { expiry_date }] })),
}))

export default ItemStore;