package com.cyber.escape.domain.thema.dto;

import com.cyber.escape.domain.thema.entity.Thema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Builder
@AllArgsConstructor
@Getter
public class ThemaDto {

    private final String themaUuid;
    private final ThemaType category;
    private final String description;

    public static ThemaDto from(Thema thema){
        return ThemaDto.builder()
                .themaUuid(thema.getUuid())
                .category(ThemaType.getNameByOrder(thema.getCategory()))
                .description(thema.getDescription())
                .build();
    }
    public enum ThemaType{

        UNKNOWN("테마가 선택되지 않았습니다", -1),
        HORROR("공포 테마", 1),
        HORROR_VICTIM("공포 테마 - 실험체", 2),
        HORROR_SCIENTIST("공포 테마 - 과학자", 3),
        TALE("싸피 테마", 4),
        TALE_HERO("싸피 테마 - 교육생", 5),
        TALE_VILLAIN("싸피 테마 - 컨설턴트", 6),
        SSAFY("우주 테마", 7);

        private String name;
        private int order;

        ThemaType(String name, int order){
            this.name = name;
            this.order = order;
        }

        public String getName(){
            return name;
        }

        public int getOrder(){
            return order;
        }

        public static ThemaType getNameByOrder(int order) {
            for (ThemaType themaType : ThemaType.values()) {
                if (themaType.getOrder() == order) {
                    return themaType;
                }
            }

            throw new IllegalStateException("order에 맞는 테마가 없습니다.");
        }

    }
}
