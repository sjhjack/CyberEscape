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
  navigation?: boolean
  pagination?: boolean
}
const themeData: CardInfo[] = [
  {
    title: "공포",
    time: "10분",
    content: "정신을 차려보니 폐병원에 누워있다. 어서 이 곳을 탈출해",
    image: process.env.NEXT_PUBLIC_IMAGE_URL + "/image/1.png",
  },
  {
    title: "SSAFY",
    time: "10분",
    content:
      "날씨도 좋은데 도망가고 싶은 걸? 프로님의 눈길을 피해 멀티캠퍼스를 탈출하라!",
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
  navigation,
  pagination,
}: CarouselProps) => {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const { setSelectedTheme, selectedThemeType } = useIngameThemeStore()
  const [modeThemeData, setModeThemeData] = useState<CardInfo[]>([])
  useEffect(() => {
    if (selectedThemeType === "single") {
      setModeThemeData(themeData)
    } else {
      setModeThemeData(themeData.splice(0, 2))
    }
  }, [selectedThemeType])
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
        {modeThemeData?.map((item: CardInfo, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ThemeCard themeData={item} $width={width} $height={height} />
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
