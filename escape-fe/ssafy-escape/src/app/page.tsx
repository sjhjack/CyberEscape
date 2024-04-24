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
import styled from "styled-components";
import { Mesh } from "three";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js";
import CameraKeyControls from "@/components/ingame/CameraControl";
import Modal from "@/components/ingame/QuizModal";
import type { NextPage } from "next";

interface KeyProps {
  onClick: () => void;
};

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void;
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

interface PointerLockControlsMethods {
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
