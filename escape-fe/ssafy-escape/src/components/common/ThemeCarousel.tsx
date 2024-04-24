"use client"
import React, { useState, useEffect } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardComponent from "./ThemeCard"
import * as S from "../../app/game/theme/themeStyle"
import "swiper/css"
import "swiper/css/navigation"
type SelectThemeFunction = (index: number) => void
export interface CardInfoProp {
  title: string
  time: string
  content: string
  image: string
}

const ThemeCarousel = ({
  selectTheme,
}: {
  selectTheme: SelectThemeFunction
}) => {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const themeData: CardInfoProp[] = [
    {
      title: "공포",
      time: "10-15분",
      content: "무서운 거임",
      image: "/image/horror.jpg",
    },
    {
      title: "SSAFY",
      time: "10-15분",
      content: "탈출 마렵다",
      image: "/image/ssafy.jpg",
    },
    {
      title: "일반",
      time: "10-15분",
      content: "희주야 들어와",
      image: "/image/normal.jpg",
    },
  ]
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
        {themeData?.map((item: object, index: any) => {
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
