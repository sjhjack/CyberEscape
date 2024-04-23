"use client"
import React, { useState, useEffect } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardComponent from "./card"
import "swiper/css"
import "swiper/css/navigation"
type SelectThemeFunction = (index: number) => void
const Carousel = ({
  selectTheme,
  data,
}: {
  selectTheme: SelectThemeFunction
  data: object[]
}) => {
  const [currentCard, setCurrentCard] = useState<number>(0)

  useEffect(() => {
    selectTheme(currentCard)
  }, [currentCard])
  return (
    <main>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        threshold={1}
        onSlideChange={(prop) => setCurrentCard(prop.activeIndex)}
        spaceBetween={100}
        centeredSlides={true}
        navigation={true}
      >
        {data?.map((item: object, index: any) => {
          return (
            <SwiperSlide key={index}>
              <CardComponent card={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </main>
  )
}

export default Carousel
