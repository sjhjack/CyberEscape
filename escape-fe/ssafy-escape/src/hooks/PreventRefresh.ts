"use client"
import { useEffect } from "react"
import Swal from "sweetalert2"

export const usePreventRefresh = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }

    const handleUnload = (e: Event) => {
      e.preventDefault()
      Swal.fire({
        title: "경고",
        text: "새로고침하면 방이 초기화됩니다. 이동하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          window.removeEventListener("beforeunload", handleBeforeUnload)
          window.location.href = "/main"
        }
      })
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("unload", handleUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("unload", handleUnload)
    }
  }, [])
}
