"use client"
import { ReactNode } from "react"
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"

interface ModalProps {
  children: ReactNode
  text: string // 최상단 중앙의 제목 내용
  isOpen: boolean
  onClose: () => void
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
}: ModalProps) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox $width={width} $height={height}>
          <div style={{ position: "relative" }}>
            <MainText>{text}</MainText>
            <IconBox onClick={onClose}>
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconBox>
          </div>
          <hr style={{ margin: "10px 0" }} />
          {children}
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
`

const MainText = styled.div`
  text-align: center;
  font-size: 20px;
`

const IconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: -8px;
  top: -8px;
`
