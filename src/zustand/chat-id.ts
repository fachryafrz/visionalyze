import { create } from "zustand";

type Chat = {
  chatID: number;
  incrementChatID: (chatID: number | undefined) => void;
};

export const useChatID = create<Chat>()((set) => ({
  chatID: 0,
  incrementChatID: (chatID) => set({ chatID: (chatID ?? 0) + 1 }),
}));
