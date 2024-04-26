"use client"

import Button from "@/components/common/Button"
import * as S from "../../app/(isLogIn)/main/friends/friendsStyle"

const Friends = () => {
  return (
    <div>
      <S.TitleText>
        친구 목록
        <S.ButtonBox>
          <Button
            text="친구 추가"
            theme="success"
            width="auto"
          />
        </S.ButtonBox>
      </S.TitleText>
    </div>
  )
}

export default Friends
