import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        loader: true,
        isLoggedIn: false,
        boards: [],
        areBoardsFetched: false,

        toastMsg: '',
        setToastMsg: (toastMsg) => set({ toastMsg }),

        setBoards: (boards) =>
          set(
            {
              boards,
              areBoardsFetched: true,
            },
            false,
            'setBoards'
          ),

        addBoard: (board) =>
          set((old) => ({ boards: [board, ...old.boards] })),

        setLoginStatus: (status) =>
          set(
            {
              isLoggedIn: status,
              loader: false,
            },
            false,
            'setLoginStatus'
          ),
      }),
      {
        name: 'app-storage', // key in localStorage
        partialize: (state) => ({
          boards: state.boards,
          areBoardsFetched: state.areBoardsFetched,
        }), // only persist the necessary parts
      }
    )
  )
);

export default useStore;
