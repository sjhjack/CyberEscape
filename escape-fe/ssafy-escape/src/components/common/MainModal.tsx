"use client"

import { ReactNode, useEffect } from "react"
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"
import Button from "./Button"
import useModalStore from "@/stores/ModalStore"

interface ModalProps {
  children: ReactNode
  text: string // 최상단 중앙의 제목 내용
  isOpen: boolean
  onClose: () => void
  isFriendModal?: boolean // 친구 관련 모달인지 여부
  width?: string
  height?: string
}

interface ModalStyleProps {
  $width?: string
  $height?: string
}

const MainModal = ({
  children,
  width,
  height,
  text,
  isOpen,
  onClose,
  isFriendModal,
}: ModalProps) => {
  const {
    isRequestModalOpen,
    setIsRequestModalOpen,
    isDeleteMode,
    setIsDeleteMode,
  } = useModalStore()

  useEffect(() => {
    return () => {
      if (isFriendModal) {
        setIsDeleteMode(false)
      }
    }
  }, [])

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ zIndex: 1020 }}
      >
        <ModalBox $width={width} $height={height}>
          <div style={{ position: "relative" }}>
            <MainText>{text}</MainText>
            <IconBox onClick={onClose}>
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconBox>
          </div>
          <hr style={{ margin: "10px 0" }} />
          <ContentArea>{children}</ContentArea>
          {isFriendModal ? (
            <ButtonBox>
              <Button
                text="친구 추가"
                theme="success"
                width="auto"
                onClick={() => setIsRequestModalOpen(!isRequestModalOpen)}
              />
              <Button
                text="친구 삭제"
                theme="fail"
                width="auto"
                onClick={() => setIsDeleteMode(!isDeleteMode)}
              />
            </ButtonBox>
          ) : null}
        </ModalBox>
      </Modal>
    </div>
  )
}

export default MainModal

const ModalBox = styled.div<ModalStyleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.$width || "35vw"};
  height: ${(props) => props.$height || "60vh"};
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  overflow: hidden;
  z-index: 100;
`

const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`

const ContentArea = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);

  &::-webkit-scrollbar {
    display: none;
  }
`

const MainText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const IconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: -8px;
  top: -8px;
`
