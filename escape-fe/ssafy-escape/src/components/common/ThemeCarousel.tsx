"use client"
import React, { useState, useEffect } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardComponent from "./ThemeCard"
import * as S from "../../app/game/theme/themeStyle"
import "swiper/css"
import "swiper/css/navigation"
type SelectThemeFunction = (index: number) => void
const ThemeCarousel = ({
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
    <S.MainContainer>
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
    </S.MainContainer>
  )
}

export default ThemeCarousel
