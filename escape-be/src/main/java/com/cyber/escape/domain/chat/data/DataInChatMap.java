package com.cyber.escape.domain.chat.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class DataInChatMap {

    private final String userNickname;
    private final String userUuid;

    public boolean isExistInChatRoom(DataInChatMap obj){
        DataInChatMap current = obj;

        return current.userNickname.equals(obj.userNickname);
    }
}
