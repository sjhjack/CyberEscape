import MainModal from "../common/MainModal"
import InvitedList from "./InvitedList"

const NotificationModal = ({ open, onClose }: ModalProps) => {
  return (
    <MainModal text="초대 요청" isOpen={open} onClose={onClose}>
      <InvitedList />
    </MainModal>
  )
}

export default NotificationModal
