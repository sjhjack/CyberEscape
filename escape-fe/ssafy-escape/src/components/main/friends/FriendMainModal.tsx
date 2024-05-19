import FriendRequestModal from "@/components/main/friends/FriendRequestModal"
import FriendList from "@/components/main/friends/FriendList"
import MainModal from "@/components/common/MainModal"
import useModalStore from "@/stores/ModalStore"
import FriendRequestActions from "./FriendRequestActions"
import { createContext, useContext, useEffect } from "react"
import getFriendList from "@/services/main/friends/getFriendList"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

const FriendContext = createContext({
  refetchFriends: () => {},
})
export const useFriendContext = () => useContext(FriendContext)

const FriendMainModal = ({ open, onClose }: ModalProps) => {
  const { isRequestModalOpen, setIsRequestModalOpen, setIsDeleteMode } =
    useModalStore()
  const handleRequestModalClose = () => {
    setIsRequestModalOpen(false)
  }
  const { refetch } = useInfiniteQuery({
    queryKey: ["friendList"],
    queryFn: ({ pageParam }) => getFriendList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  useEffect(() => {
    if (open) {
      refetch()
      setIsDeleteMode(false)
    }
  }, [open, refetch])

  return (
    <FriendContext.Provider value={{ refetchFriends: refetch }}>
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
    </FriendContext.Provider>
  )
}

export default FriendMainModal
