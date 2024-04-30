import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls"

declare global {
  interface Window {
    pointerLockControls?: PointerLockControlsImpl
  }
}
