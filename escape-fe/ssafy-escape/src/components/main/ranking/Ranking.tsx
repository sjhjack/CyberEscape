"use client"

import { useEffect, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import FlagIcon from "@mui/icons-material/Flag"
import postRankingList from "@/services/main/ranking/postRankingList"
import formatTime from "@/hooks/FormatTime"
import * as S from "@/app/@modal/main/ranking/rankingStyle"

const Ranking = () => {
  const themeIdx = [1, 4, 7]
  const themes = ["공포", "싸피", "우주"]
  const [activeTheme, setActiveTheme] = useState<number>(0)

  // 무한 스크롤 테스트 시 해당 영역 overflow 속성 추가 필요
  const {
    data: rankingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["rankingList", themeIdx[activeTheme]],
    queryFn: () => postRankingList(1, themeIdx[activeTheme]),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  const handleScroll = (event: Event) => {
    const target = event.target as Document
    if (
      target.documentElement.scrollTop + window.innerHeight + 200 >=
      target.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleClick = (index: number) => {
    setActiveTheme(index)
  }
  //   const queryClient = new QueryClient()

  //   useEffect(() => {
  //     queryClient.prefetchQuery({
  //       queryKey: ["rankingList", page, themeuuid],
  //       queryFn: () => postRankingList(page, themeuuid),
  //     })
  //   }, [])
  //   const { data: rankingData, isLoading } = useQuery({
  //     queryKey: ["rankingList", page, themeuuid],
  //     queryFn: () => postRankingList(page, themeuuid),
  //   })

  if (!rankingData) {
    return <div>데이터 없음</div>
  }
  return (
    <div>
      <S.TitleBox>
        <EmojiEventsIcon sx={{ fontSize: "55px" }} />
        <div>싱글 랭킹</div>
      </S.TitleBox>
      <S.ThemeMainBox>
        {themes.map((theme, index) => (
          <S.ThemeSubBox key={index} onClick={() => handleClick(index)}>
            <S.CustomImage
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                `/image/${themeIdx[index]}emoticon.png`
              }
              alt={theme}
              width={60}
              height={60}
              $isActive={activeTheme === index}
            />
            <div
              style={{ fontWeight: activeTheme === index ? "bold" : "normal" }}
            >
              {theme}
            </div>
          </S.ThemeSubBox>
        ))}
      </S.ThemeMainBox>
      {rankingData.pages.map((page, i) => (
        <S.RankingMainBox key={i}>
          <S.RankingSubBox>
            {page.length === 0 ? (
              <S.NoTimeText>
                아직 클리어한 유저가 없습니다. 첫 클리어에 도전해보세요!
              </S.NoTimeText>
            ) : null}
            {page.map((rank, idx) => (
              <div key={idx}>
                <S.RankInfo>
                  <S.RankPosition>
                    {rank.rank === 1 ? (
                      <S.First>1위.</S.First>
                    ) : rank.rank === 2 ? (
                      <S.Second>2위.</S.Second>
                    ) : rank.rank === 3 ? (
                      <S.Third>3위.</S.Third>
                    ) : (
                      <div>{rank.rank}위.</div>
                    )}
                  </S.RankPosition>
                  <S.ProfileBox>
                    <S.ProfileImg src={rank.profileUrl} alt="프로필 이미지" />
                    <S.Nickname $isTopThree={rank.rank <= 3}>
                      {rank.nickname}
                    </S.Nickname>
                    <S.Time $isTopThree={rank.rank <= 3}>
                      <FlagIcon />
                      {formatTime(rank.bestTime)} 클리어
                    </S.Time>
                  </S.ProfileBox>
                </S.RankInfo>
                {/* <hr /> */}
              </div>
            ))}
          </S.RankingSubBox>
        </S.RankingMainBox>
      ))}
    </div>
  )
}

export default Ranking
