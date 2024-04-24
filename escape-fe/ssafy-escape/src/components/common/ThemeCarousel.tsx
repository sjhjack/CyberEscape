"use client"
import React, { useState, useEffect } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardComponent from "./ThemeCard"
import styled from "styled-components"
import "swiper/css"
import "swiper/css/navigation"
interface SelectThemeFunction {
  (index: number): void
}

interface CarouselProps {
  selectTheme: SelectThemeFunction
  $width?: string
  $height?: string
  navigation?: boolean
  pagination?: boolean
}
const ThemeCarousel = ({ selectTheme }: CarouselProps) => {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const themeData: CardInfo[] = [
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
    <MainContainer>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        threshold={1}
        onSlideChange={(prop) => setCurrentCard(prop.activeIndex)}
        spaceBetween={100}
        centeredSlides={true}
        navigation={true}
        pagination={true}
      >
        {themeData?.map((item: CardInfo, index: number) => {
          return (
            <SwiperSlide key={index}>
              <CardComponent themeData={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </MainContainer>
  )
}

export default ThemeCarousel

const MainContainer = styled.div`
  margin-top: 3%;
  width: 90%;
`
