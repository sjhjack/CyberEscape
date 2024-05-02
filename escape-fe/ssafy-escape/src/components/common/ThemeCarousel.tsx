"use client"
import React, { useState, useEffect } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ThemeCard from "./ThemeCard"
import styled from "styled-components"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// 어떤 테마를 선택했는지 파악하기 위해 인덱스로 정보 전달
interface SelectThemeFunction {
  (index: number): void
}

interface CarouselProps {
  selectTheme: SelectThemeFunction
  width?: number
  height?: number
  navigation?: boolean
  pagination?: boolean
}
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
const ThemeCarousel = ({
  selectTheme,
  width,
  height,
  navigation,
  pagination,
}: CarouselProps) => {
  const [currentCard, setCurrentCard] = useState<number>(0)

  useEffect(() => {
    selectTheme(currentCard)
  }, [currentCard])
  return (
    <MainContainer style={{ borderRadius: "20px" }}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        threshold={1}
        onSlideChange={(e) => setCurrentCard(e.activeIndex)}
        spaceBetween={100}
        centeredSlides={true}
        navigation={navigation ? navigation : false}
        pagination={
          pagination ? (pagination === true ? { clickable: true } : {}) : false
        }
      >
        {themeData?.map((item: CardInfo, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ThemeCard themeData={item} width={width} height={height} />
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