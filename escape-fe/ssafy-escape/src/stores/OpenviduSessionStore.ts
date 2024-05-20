// store/useOpenviduStore
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Session, StreamManager, Publisher } from "openvidu-browser"
interface ChatData {
  userName: string
  message: string
}
interface OpenviduSession {
  session: Session | undefined
  subscribers: StreamManager[]
  publisher: Publisher | null
  chatData: ChatData[]
  setSession: (session: Session | undefined) => void
  setSubscribers: (subscribers: StreamManager[]) => void
  setPublisher: (publisher: Publisher | null) => void
  setChatData: (chatData: ChatData[]) => void
  addChatData: (newData: ChatData) => void
  addSubscriber: (subscriber: StreamManager) => void
  removeSubscriber: (subscriber: StreamManager) => void
  clearSession: () => void
}

const useOpenViduStore = create<OpenviduSession>()(
  persist(
    (set): OpenviduSession => ({
      session: undefined,
      subscribers: [],
      publisher: null,
      chatData: [],
      setSession: (session) => set({ session }),
      setSubscribers: (subscribers) => set({ subscribers }),
      setPublisher: (publisher) => set({ publisher }),
      addChatData: (newData) =>
        set((state) => ({ chatData: [...state.chatData, newData] })),
      setChatData: (chatData) => set({ chatData }),
      addSubscriber: (subscriber) =>
        set((state) => ({ subscribers: [...state.subscribers, subscriber] })),
      removeSubscriber: (subscriber) =>
        set((state) => ({
          subscribers: state.subscribers?.filter((s) => s !== subscriber),
        })),
      clearSession: () =>
        set({
          session: undefined,
          subscribers: [],
          publisher: null,
          chatData: [],
        }),
    }),
    {
      name: "openvidu-storage",
      serialize: (state) => JSON.stringify(state), // 직렬화 로직
      deserialize: (str) => JSON.parse(str), // 역직렬화 로직
    },
  ),
)
useOpenViduStore.subscribe((state) => {
  console.log("세션 상태 변화:", state)
})
export default useOpenViduStore
