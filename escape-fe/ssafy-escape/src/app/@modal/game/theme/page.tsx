import { Suspense } from "react"
import Theme from "@/components/game/theme/Theme"

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Theme />
    </Suspense>
  )
}

export default Page
