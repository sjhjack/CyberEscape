import { create } from "zustand"

interface ModalProps {
  isRequestModalOpen: boolean
  isDeleteMode: boolean
  setIsRequestModalOpen: (isOpen: boolean) => void
  setIsDeleteMode: (isDeleting: boolean) => void
  resetModal: () => void
}

const useModalStore = create<ModalProps>((set) => ({
  isRequestModalOpen: false,
  isDeleteMode: false,
  setIsRequestModalOpen: (isOpen: boolean) =>
    set({ isRequestModalOpen: isOpen }),
  setIsDeleteMode: (isDeleting: boolean) => set({ isDeleteMode: isDeleting }),
  resetModal: () => set({ isRequestModalOpen: false, isDeleteMode: false }),
}))

export default useModalStore
