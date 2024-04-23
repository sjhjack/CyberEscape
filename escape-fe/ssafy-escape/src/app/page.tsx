"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import styled from "styled-components";
import * as THREE from "three";
import { Mesh } from "three";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js";

interface KeyProps {
  onClick: () => void;
};

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void;
};

interface ModalProps {
  onClose: () => void;
  onHideObject: () => void;
};

const CameraKeyControls = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3(4, 3, -2));
  const [position, setPosition] = useState(new THREE.Vector3(4, 3, -2));
  const [moveDirection, setMoveDirection] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w":
          setMoveDirection((prev) => ({ ...prev, forward: true }));
          break;
        case "s":
          setMoveDirection((prev) => ({ ...prev, backward: true }));
          break;
        case "a":
          setMoveDirection((prev) => ({ ...prev, left: true }));
          break;
        case "d":
          setMoveDirection((prev) => ({ ...prev, right: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w":
          setMoveDirection((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
          setMoveDirection((prev) => ({ ...prev, backward: false }));
          break;
        case "a":
          setMoveDirection((prev) => ({ ...prev, left: false }));
          break;
        case "d":
          setMoveDirection((prev) => ({ ...prev, right: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      let direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.normalize();

      let left = new THREE.Vector3();
      left.crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize();

      let newPosition = position.clone();
      positionRef.current = newPosition;

      if (moveDirection.forward) {
        newPosition.addScaledVector(direction, 0.05);
      }
      if (moveDirection.backward) {
        newPosition.addScaledVector(direction, -0.05);
      }
      if (moveDirection.left) {
        newPosition.addScaledVector(left, 0.05);
      }
      if (moveDirection.right) {
        newPosition.addScaledVector(left, -0.05);
      }

      newPosition.y = position.y;

      if (!position.equals(newPosition)) {
        setPosition(newPosition);
        camera.position.set(newPosition.x, newPosition.y, newPosition.z);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const isMoving = Object.values(moveDirection).some((value) => value);
    if (isMoving) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [camera, position, moveDirection]);

  return null;
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
      window.pointerLockControls?.lock();
    } else {
      alert("틀렸습니다.");
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <div>문제 1(난이도5)</div>
      <div>16+9 = 1 8+6 = 2 14+13 = 3 4+11 = ?</div>
      <input
        placeholder="정답을 입력해주세요."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>제출</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

function GLTFModel({ onLoaded }: RoomProps) {
  const gltf = useGLTF("/glb/Another_bedroom.glb", true);

  useEffect(() => {
    if (gltf) {
      onLoaded(true);
    }
  }, [gltf, onLoaded]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={1} />;
}
function SceneModel({ onClick }: KeyProps) {
  const { scene } = useGLTF("/glb/key.glb");

  return (
    <>
      {scene.children.map((child, index) => {
        if (child instanceof Mesh) {
          return (
            <mesh
              key={index}
              geometry={child.geometry}
              material={child.material}
              position={[0.88, 1.15, 3.8]}
              scale={[0.05, 0.05, 0.05]}
              onClick={onClick}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

const PointerLockControls = forwardRef((props, ref) => {
  const { camera, gl } = useThree();
  const [startPosition] = useState({ x: 8, y: 8, z: -2 });
  const [targetPosition, setTargetPosition] = useState({ x: 4, y: 3, z: -2 });
  const [isMoving, setIsMoving] = useState(true);

  useImperativeHandle(ref, () => ({
    moveToPosition: (x: number, y: number, z: number) => {
      setTargetPosition({ x, y, z });
      setIsMoving(true);
    },
  }));

  useEffect(() => {
    camera.position.set(startPosition.x, startPosition.y, startPosition.z);
    camera.zoom = 2.5;
    camera.lookAt(-4, 2, 2);
    camera.updateProjectionMatrix();

    const controls = new PointerLockControlsImpl(camera, gl.domElement);
    window.pointerLockControls = controls;

    const onPointerLockChange = () => {
      if (!document.pointerLockElement) {
        window.pointerLockControls?.unlock();
      }
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      controls.dispose();
      window.pointerLockControls = undefined;
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, [camera, gl.domElement, startPosition]);

  useFrame(() => {
    if (isMoving) {
      const dx = targetPosition.x - camera.position.x;
      const dy = targetPosition.y - camera.position.y;
      const dz = targetPosition.z - camera.position.z;

      const speed = 0.03;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(dz) < 0.1) {
        setIsMoving(false);
      } else {
        camera.position.x += dx * speed;
        camera.position.y += dy * speed;
        camera.position.z += dz * speed;
      }

      camera.lookAt(-4, 2, 2);
      camera.updateProjectionMatrix();
    }
  });
  PointerLockControls.displayName = "PointerLockControls";
  return null;
});

type PointerLockControlsMethods = {
  moveToPosition: (x: number, y: number, z: number) => void;
};

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showObject, setShowObject] = useState(true);
  const pointerLockControlsRef = useRef<PointerLockControlsMethods | null>(
    null
  );
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleHideObject = () => {
    setShowObject(false);
  };

  const onKeyClick = () => {
    setShowModal(!showModal);
  };
  const onStartClick = () => {
    if (!document.pointerLockElement) {
      window.pointerLockControls?.lock();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isModelLoaded && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsGameStart(true);
    }
    return () => clearInterval(intervalId);
  }, [isModelLoaded, countdown]);

  return (
    <ParentDiv>
      <Canvas
        shadows
        style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          castShadow
          receiveShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {showObject && <SceneModel onClick={onKeyClick} />}
        <GLTFModel onLoaded={setIsModelLoaded} />
        <PointerLockControls ref={pointerLockControlsRef} />
        {isGameStart ? <CameraKeyControls /> : null}
      </Canvas>
      {isModelLoaded && countdown > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "40px",
            zIndex: 100,
          }}
        >
          {countdown}
        </div>
      ) : null}
      {isModelLoaded && isGameStart ? (
        <StartButton onClick={() => onStartClick()}>화면 이동</StartButton>
      ) : null}
      {showModal && (
        <Modal onClose={handleModalClose} onHideObject={handleHideObject} />
      )}
    </ParentDiv>
  );
};

export default Home;

const ParentDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const StartButton = styled.button`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 16px;
  z-index: 10;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
