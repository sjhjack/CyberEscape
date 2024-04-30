import { useState } from "react";
import styled from "styled-components";

interface ModalProps {
    onClose: () => void;
    onHideObject: () => void;
  };

const Modal = ({ onClose, onHideObject }: ModalProps) => {
    const [inputValue, setInputValue] = useState("");
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = () => {
      if (inputValue === "3") {
        alert("정답입니다!");
        onClose();
        onHideObject();
        document.dispatchEvent(new Event("modalClose"));
      } else {
        alert("틀렸습니다.");
        setInputValue("");
      }
    };
  
    return (
      <Container>
        <ModalBox>
            <div>문제 1(난이도5)</div>
            <div>16+9 = 1 8+6 = 2 14+13 = 3 4+11 = ?</div>
            <input
            placeholder="정답을 입력해주세요."
            value={inputValue}
            onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>제출</button>
            <button onClick={onClose}>닫기</button>
        </ModalBox>
      </Container>
    );
  };

const Container = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 75vh;
    background-color: #eaeaea;
    border-radius: 20px;
    margin: 8% auto;
`

export default Modal;