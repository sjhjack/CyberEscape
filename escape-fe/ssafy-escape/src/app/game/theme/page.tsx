"use client";

import Container from "../../../components/common/Container";
import "./style.css";
import { useRouter } from "next/navigation";
const GamePage = () => {
  const router = useRouter();
  return (
    <Container>
      <h1>테마 선택</h1>
    </Container>
  );
};
export default GamePage;
