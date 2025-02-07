import { create } from "zustand";

type Chat = {
  chatID: number;
  setChatID: (chatID: number | undefined) => void;
  handleReset: (chatID: number | undefined) => void;
};

export const useChatID = create<Chat>()((set) => ({
  chatID: 0,
  setChatID: (chatID) => set({ chatID: chatID ?? 0 }),
  handleReset: (chatID) => set({ chatID: (chatID ?? 0) + 1 }),
}));
