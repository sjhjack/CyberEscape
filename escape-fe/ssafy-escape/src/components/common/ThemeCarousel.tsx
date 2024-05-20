"use client"
import React, { useState, useEffect } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ThemeCard from "./ThemeCard"
import useIngameThemeStore from "@/stores/IngameTheme"

import styled from "styled-components"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface CarouselProps {
  width?: number
  height?: number
  fontsize?: string
  navigation?: boolean
  pagination?: boolean
}
const themeData: CardInfo[] = [
  {
    title: "공포",
    time: "8분",
    content:
      "당신은 일과를 마치고 귀가하던 중 납치를 당해 정신을 잃었고, 눈을 떠보니 낯선 병실 안이었습니다. 간간히 정체불명의 비명소리가 들립니다. 이대로 있다가는 저 비명소리의 주인이 되고 말 거예요! 제한 시간 내에 병실에 숨겨져 있는 단서를 찾아 싸이코패스 과학자에게서 탈출해야 합니다.",
    image: process.env.NEXT_PUBLIC_IMAGE_URL + "/image/1.png",
  },
  {
    title: "SSAFY",
    time: "5분",
    content:
      "날씨도 좋은데 한강으로 도망가고 싶은 걸? 하지만, 오늘 풀어야 할 문제들을 모두 풀기 전에는 나갈 수 없다. 교육 프로님에게 들키기 전에 문제를 풀고 멀티캠퍼스를 탈출하라!",
    image: process.env.NEXT_PUBLIC_IMAGE_URL + "/image/4.png",
  },
  {
    title: "우주",
    time: "10분",
    content: "오희주의 걸작품 Spaceship! 우주선에서 탈출하라!",
    image: process.env.NEXT_PUBLIC_IMAGE_URL + "/image/7.png",
  },
]

const themeIdx = [1, 4, 7]

const ThemeCarousel = ({
  width,
  height,
  fontsize,
  navigation,
  pagination,
}: CarouselProps) => {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const { setSelectedTheme, selectedThemeType } = useIngameThemeStore()
  const filteredThemeData =
    selectedThemeType === "multi" ? themeData.slice(0, 2) : themeData

  useEffect(() => {
    setSelectedTheme(themeIdx[currentCard])
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
        {filteredThemeData?.map((item: CardInfo, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ThemeCard
                themeData={item}
                $width={width}
                $height={height}
                fontsize={fontsize}
              />
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
