import { create } from "zustand";

// STEP-> 1... go subjectAndDateRecord and import ItemStore and use it(ARRAY-->push concept)
const ItemStore = create((set, get) => ({
  // items:0,
  items: [],
  items1: [],
  //ERROR SOLVE --> after goBack when again click submit btn than show null(0) result on totalRecord section bcz its refresh. 
  // step A---> so instead setExpiryDate useState we use from the store ... make expiryDate var & go subjectAndDateRecord....
  expiryDate: [],
  // sub_id: [],
  // ex_date: [],
  // length_r: [],
  // length_c: [],
  addItem: ({ sub_id, ex_date }) => set((state) => ({ items: [...state.items, { sub_id, ex_date }] })),
  addItem1: ({ reg_length, comp_length }) => set((state1) => ({ items1: [...state1.items1, { reg_length, comp_length }] })),
  addExpiryDate: ({ expiry_date }) => set((state) => ({ expiryDate: [...state.expiryDate, { expiry_date }] })),
  // addItem1: ({ reg_length }) => set((state) => ({ length_r: [state.length_r, [{ reg_length }]] })),
  // addItem2: ({ comp_length }) => set((state) => ({ length_c: [state.length_c, { comp_length }] })),

  // step1-->>------for Total Record--> go subjectAndDateRecord...(DYNAMIC store)
  totalReg: 0,
  addTotalRegistration: ({ total_reg }) => set((state) => ({ totalReg: state.totalReg, total_reg })),
  totalComp: 0,
  addTotalCompetition: ({ total_comp }) => set((state) => ({ totalComp: state.totalComp, total_comp })),
}))

export default ItemStore;

// // prof. way to reset value
// const initialState = {
//     // items: 0,
//     items:[],
// }
// // updating the state
// const useStore = create(set => ({
//   // items:0,
//   ...initialState,
//   addItems: () => set(state => ({ items: state.items + 1 })),
//   subtractItems: () => set(state => ({ items: state.items - 1 })),
//   addItemsBy: (num) => set(state => ({ items: state.items + num })),
//   subtractItemsBy: (num) => set(state => ({ items: state.items - num })),
//   // reset : ()=> set((state) => ({items: 0})),
//   reset: () => set(initialState),
// }));

// export default useStore;
