package com.cyber.escape.domain.user.dto;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.cyber.escape.domain.quiz.entity.FinalAnswer;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.util.FileUtil;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

	@Builder
	@Getter
	@Setter
	public static class SignupRequest {
		private String loginId;
		private String password;
		private String nickname;
		private String profileUrl;
		private String savedFileName;

		public void setInfo(final String password, final String nickname) {
			this.password = password;
			this.nickname = nickname;
			this.profileUrl = FileUtil.DEFAULT_FILE_URL;
			this.savedFileName = FileUtil.DEFAULT_FILE_NAME;
		}
	}

	@Builder
	@Getter
	public static class SigninRequest {
		private String loginId;
		private String password;

		public UsernamePasswordAuthenticationToken toAuthentication() {
			return new UsernamePasswordAuthenticationToken(loginId, password);
		}
	}

	@Builder
	@Getter
	public static class SigninResponse {
		private String loginId;
		private String grantType;
		private String accessToken;
		private String refreshToken;
		private String userUuid;
		private String nickname;
		private String profileUrl;

		public static SigninResponse of(
			final String loginId,
			final String grantType,
			final String accessToken,
			final String refreshToken
		) {
			return SigninResponse.builder()
				.loginId(loginId)
				.grantType(grantType)
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.build();
		}

		public void setUserInfo(User user) {
			this.userUuid = user.getUuid();
			this.nickname = user.getNickname();
			this.profileUrl = user.getProfileUrl();
		}
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
		private String userUuid;
		private String profileUrl;
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
        private String newNickname;
		public UpdateNicknameRequest(){

		}
		public UpdateNicknameRequest(String newNickname){
			this.newNickname = newNickname;
		}
    }


	@Builder
	@Getter
	public static class Response {
		private String loginId;
		// private String password;		// 이건 필요 없잖아? 오히려 있으면 보안에 안 좋아.
		private String nickname;
		private int point;
		// private long characterId;
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

	@Builder
	@Getter
	public static class StompResponse {
		private String nickname;
		private String profileUrl;
		private String uuid;

		public static StompResponse from(User user){
			return StompResponse.builder()
				.nickname(user.getNickname())
				.profileUrl(user.getProfileUrl())
				.uuid(user.getUuid())
				.build();
		}
	}
}
