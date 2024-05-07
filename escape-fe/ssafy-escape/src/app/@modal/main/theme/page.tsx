import { Suspense } from "react"
import Theme from "@/components/game/theme/Theme"
import CircularProgress from "@mui/material/CircularProgress"
const Page = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Theme />
    </Suspense>
  )
}

export default Page
