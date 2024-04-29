import FriendRequestModal from "@/components/main/friends/FriendRequestModal"
import FriendList from "@/components/main/friends/FriendList"
import MainModal from "@/components/common/MainModal"
import useModalStore from "@/stores/ModalStore"

interface RoomMainModalProps {
  open: boolean
  onClose: () => void
}
const RoomPasswordModal = ({ open, onClose }: RoomMainModalProps) => {
  return (
    <MainModal
      isOpen={open}
      onClose={onClose}
      text="비밀번호 입력"
      isFriendModal={false}
    >
      <input type="password" name="" id="" />
    </MainModal>
  )
}

export default RoomPasswordModal
