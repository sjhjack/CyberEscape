import FriendRequestModal from "@/components/main/friends/FriendRequestModal"
import FriendList from "@/components/main/friends/FriendList"
import MainModal from "@/components/common/MainModal"
import useModalStore from "@/stores/ModalStore"
import FriendRequestActions from "./FriendRequestActions"

interface FriendMainModalProps {
  open: boolean
  onClose: () => void
}
const FriendMainModal = ({ open, onClose }: FriendMainModalProps) => {
  const { isRequestModalOpen, setIsRequestModalOpen } = useModalStore()
  const handleRequestModalClose = () => {
    setIsRequestModalOpen(false)
  }

  return (
    <MainModal
      isOpen={open}
      onClose={onClose}
      text="친구 목록"
      isFriendModal={true}
    >
      <FriendRequestActions />
      <hr />
      <FriendList />
      <FriendRequestModal
        open={isRequestModalOpen}
        onClose={handleRequestModalClose}
      />
    </MainModal>
  )
}

export default FriendMainModal
