package com.cyber.escape.domain.user.dto;

import com.cyber.escape.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;

public class UserDto {
    @Getter
    @Builder
    public static class NicknameResponse{
        private String[] words;
        private String seed;
    }

    @Getter
    @Builder
    public static class SearchNicknameRequest{
        private String fromUserUuid;
        private String nickname;
    }

    @Getter
    @Builder
    public static class SearchNicknameResponse{
        private String nickname;
        private String relationship;
    }

    @Getter
    @Builder
    public static class CheckNicknameRequest {
        private String nickname;
        public CheckNicknameRequest(){
        }
        public CheckNicknameRequest(String nickname){
            this.nickname = nickname;
        }
    }

    @Getter
    @Builder
    public static class CheckNicknameResponse {
        private boolean isAvailable;
        public CheckNicknameResponse(){
        }
        public CheckNicknameResponse(boolean isAvailable){
            this.isAvailable = isAvailable;
        }
    }

    @Getter
    @Builder
    public static class UpdateNicknameRequest{
        private String userUuid;
        private String newNickname;
    }


	@Builder
	@Getter
	public static class Response {
		private String loginId;
		// private String password;		// 이건 필요 없잖아? 오히려 있으면 보안에 안 좋아.
		private String nickname;
		private int point;
		private long characterId;
		// private boolean withdrawal;

		public static Response from(User user){
			return Response.builder()
				.loginId(user.getLoginId())
				.nickname(user.getNickname())
				.point(user.getPoint())
//				.characterId(user.getCharacterId())
				// .withdrawal(user.get)
				.build();
		}
	}
}
